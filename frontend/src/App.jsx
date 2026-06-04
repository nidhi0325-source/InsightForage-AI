import { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function App() {
  const [datasets, setDatasets] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    try {
      const response = await api.get("/datasets/");
      setDatasets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProfile = async (id) => {
    try {
      setLoading(true);

      const response = await api.get(
        `/datasets/${id}/profile/`
      );

      setProfile(response.data);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const deleteDataset = async (id) => {
    try {
      await api.delete(
        `/datasets/${id}/`
      );

      await fetchDatasets();

      setProfile(null);

      alert("Dataset deleted");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const uploadDataset = async () => {
    if (!file) {
      alert("Select a CSV file");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("name", file.name);
      formData.append("file", file);

      const response = await api.post(
        "/datasets/upload/",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      await fetchDatasets();

      if (response.data.profile) {
        setProfile(response.data.profile);
      }

      setFile(null);

      setUploading(false);

      alert("Dataset uploaded");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
      setUploading(false);
    }
  };

  const chartData = profile
    ? [
        {
          name: "Rows",
          value: profile.rows,
        },
        {
          name: "Columns",
          value: profile.columns,
        },
        {
          name: "Missing",
          value: profile.missing_values,
        },
        {
          name: "Duplicates",
          value: profile.duplicates,
        },
      ]
    : [];

  const pieData = profile
    ? [
        {
          name: "Clean",
          value:
            profile.health?.clean || 0,
        },
        {
          name: "Missing",
          value:
            profile.health?.missing || 0,
        },
      ]
    : [];

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div className="app">

      {/* SIDEBAR */}

      <div className="sidebar">

        <div className="sidebar-header">
          🚀 InsightForge
        </div>

        <h3 className="sidebar-title">
          Datasets
        </h3>

        <input
          type="text"
          placeholder="Search datasets..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="search-input"
        />

        {datasets
          .filter((dataset) =>
            dataset.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )
          .map((dataset) => (
            <div
              key={dataset.id}
              className="dataset-sidebar-card"
            >
              <div
                style={{
                  flex: 1,
                  cursor: "pointer",
                }}
                onClick={() =>
                  loadProfile(dataset.id)
                }
              >
                {dataset.name}
              </div>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteDataset(dataset.id)
                }
              >
                ✕
              </button>
            </div>
          ))}

      </div>

      {/* MAIN */}

      <div className="main">

        <div className="header">

          <div className="hero-icon">
            🚀
          </div>

          <h1 className="hero-title">
            InsightForge AI
          </h1>
          <h5 className="hero-subtitle">
              Your AI-Dataset Companion
          </h5>

          <p className="hero-subtitle">
              AI-powered dataset analytics and profiling platform

    
          </p>

        </div>

        <div className="upload-box">

          <h1 className="hero-subtitle">
            Upload Dataset
          </h1>

          <input
            type="file"
            accept=".csv"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
          />

          <button
            className="upload-btn"
            onClick={uploadDataset}
          >
            Upload
          </button>

          {uploading && (
            <p>Uploading...</p>
          )}

        </div>

        {loading && (
          <h3>
            Loading profile...
          </h3>
        )}

        {profile && (
          <>

            <h2>
              📊 Dataset Profile
            </h2>

            <div className="stats-grid">

              <div className="stat-card">
                <h3>Rows</h3>
                <h1>{profile.rows}</h1>
              </div>

              <div className="stat-card">
                <h3>Columns</h3>
                <h1>
                  {profile.columns}
                </h1>
              </div>

              <div className="stat-card">
                <h3>Missing</h3>
                <h1>
                  {
                    profile.missing_values
                  }
                </h1>
              </div>

              <div className="stat-card">
                <h3>Duplicates</h3>
                <h1>
                  {
                    profile.duplicates
                  }
                </h1>
              </div>

            </div>

            <h2>📑 Columns</h2>

            <div className="column-list">
              {profile.column_names?.map(
                (column) => (
                  <div
                    key={column}
                    className="column-badge"
                  >
                    {column}
                  </div>
                )
              )}
            </div>

            <h2>
              🔢 Numeric Columns
            </h2>

            <div className="column-list">
              {profile.numeric_columns?.map(
                (column) => (
                  <div
                    key={column}
                    className="column-badge"
                  >
                    {column}
                  </div>
                )
              )}
            </div>

            <div className="chart-box">

              <h2>
                📈 Dataset Health
              </h2>

              <ResponsiveContainer
                width="100%"
                height={350}
              >
                <BarChart
                  data={chartData}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#6366f1"
                  />
                </BarChart>
              </ResponsiveContainer>

            </div>

            <div className="chart-box">

              <h2>
                🥧 Data Quality
              </h2>

              <ResponsiveContainer
                width="100%"
                height={350}
              >
                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >
                    {pieData.map(
                      (entry, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[index]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />
                  <Legend />

                </PieChart>
              </ResponsiveContainer>

            </div>

            {profile.summary_statistics && (
              <div className="table-box">

                <h2>
                  📋 Summary Statistics
                </h2>

                <table>
                  <thead>
                    <tr>
                      <th>Column</th>
                      <th>Mean</th>
                      <th>Min</th>
                      <th>Max</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.entries(
                      profile.summary_statistics
                    ).map(
                      ([column, stats]) => (
                        <tr key={column}>
                          <td>{column}</td>

                          <td>
                            {stats.mean?.toFixed?.(
                              2
                            )}
                          </td>

                          <td>
                            {stats.min}
                          </td>

                          <td>
                            {stats.max}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

              </div>
            )}

            {profile.preview && (
              <div className="table-box">

                <h2>
                  👀 Dataset Preview
                </h2>

                <table>

                  <thead>
                    <tr>

                      {Object.keys(
                        profile.preview[0]
                      ).map((key) => (
                        <th key={key}>
                          {key}
                        </th>
                      ))}

                    </tr>
                  </thead>

                  <tbody>

                    {profile.preview.map(
                      (
                        row,
                        index
                      ) => (
                        <tr key={index}>

                          {Object.values(
                            row
                          ).map(
                            (
                              value,
                              i
                            ) => (
                              <td key={i}>
                                {String(
                                  value
                                )}
                              </td>
                            )
                          )}

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>
            )}

          </>
        )}

      </div>

    </div>
  );
}

export default App;