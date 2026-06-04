import pandas as pd
import numpy as np


def profile_dataset(file_path):

    df = pd.read_csv(file_path)

    numeric_columns = list(
        df.select_dtypes(include="number").columns
    )

    summary_stats = {}

    if len(numeric_columns) > 0:
        summary_stats = (
            df[numeric_columns]
            .describe()
            .round(2)
            .to_dict()
        )

    preview = (
        df.head(10)
        .replace({np.nan: None})
        .to_dict(orient="records")
    )

    missing_values = int(
        df.isnull().sum().sum()
    )

    total_cells = (
        len(df) * len(df.columns)
    )

    clean_values = (
        total_cells - missing_values
    )

    return {
        "rows": len(df),

        "columns": len(df.columns),

        "column_names": list(df.columns),

        "numeric_columns": numeric_columns,

        "missing_values": missing_values,

        "duplicates": int(
            df.duplicated().sum()
        ),

        "summary_statistics": summary_stats,

        "preview": preview,

        "health": {
            "clean": clean_values,
            "missing": missing_values,
        },
    }