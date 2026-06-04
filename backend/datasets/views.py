from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import DatasetSerializer
from .models import Dataset
from analytics.services import profile_dataset
from django.shortcuts import get_object_or_404
from .models import Dataset

class DatasetUploadView(APIView):

    def get(self, request):
        return Response({
            "message": "Dataset Upload API Ready"
        })

    def post(self, request):

        serializer = DatasetSerializer(
            data=request.data
        )

        if serializer.is_valid():

            dataset = serializer.save()

            stats = profile_dataset(
                dataset.file.path
            )

            return Response({
                "dataset": serializer.data,
                "profile": stats
            })

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class DatasetListView(APIView):

    def get(self, request):

        datasets = Dataset.objects.all()

        serializer = DatasetSerializer(
            datasets,
            many=True
        )

        return Response(serializer.data)


class DatasetProfileView(APIView):

    def get(self, request, dataset_id):

        try:
            dataset = Dataset.objects.get(
                id=dataset_id
            )

        except Dataset.DoesNotExist:

            return Response(
                {"error": "Dataset not found"},
                status=404
            )

        stats = profile_dataset(
            dataset.file.path
        )

        return Response(stats)
    

class DatasetDeleteView(APIView):

    def delete(self, request, pk):

        dataset = get_object_or_404(
            Dataset,
            pk=pk
        )

        dataset.delete()

        return Response({
            "message": " Dataset Deleted"
        })