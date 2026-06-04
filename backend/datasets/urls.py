from django.urls import path

from .views import (
    DatasetUploadView,
    DatasetListView,
    DatasetProfileView,
    DatasetDeleteView
)

urlpatterns = [

    path(
        "upload/",
        DatasetUploadView.as_view(),
        name="dataset-upload"
    ),

    path(
        "",
        DatasetListView.as_view(),
        name="dataset-list"
    ),

    path(
        "<int:dataset_id>/profile/",
        DatasetProfileView.as_view(),
        name="dataset-profile"
    ),

    path(
        "<int:pk>/",
        DatasetDeleteView.as_view(),
        name="dataset-delete"
    ),
]