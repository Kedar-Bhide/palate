'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { Cuisine } from '@/types';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface LogCuisineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LogCuisineModal({ isOpen, onClose, onSuccess }: LogCuisineModalProps) {
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<number[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchCuisines();
    }
  }, [isOpen]);

  const fetchCuisines = async () => {
    try {
      const response = await apiClient.get('/cuisines');
      console.log('Cuisines response:', response);
      setCuisines(response as unknown as Cuisine[]);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Failed to fetch cuisines:', error);
      setError('Failed to load cuisines. Please try refreshing the page.');
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCuisineToggle = (cuisineId: number) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisineId) 
        ? prev.filter(id => id !== cuisineId)
        : [...prev, cuisineId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCuisines.length === 0 || !photo) {
      setError('Please select at least one cuisine and upload a photo');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('cuisine_ids', JSON.stringify(selectedCuisines));
      formData.append('photo', photo);
      if (caption) {
        formData.append('caption', caption);
      }

      await apiClient.postFormData('/cuisines/log', formData);
      onSuccess();
    } catch (error) {
      console.error('Failed to log cuisine:', error);
      setError('Failed to log cuisine. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cuisinesByCategory = cuisines.reduce((acc, cuisine) => {
    if (!acc[cuisine.category]) {
      acc[cuisine.category] = [];
    }
    acc[cuisine.category].push(cuisine);
    return acc;
  }, {} as Record<string, Cuisine[]>);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">Log New Cuisine</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photo *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {photoPreview ? (
                <div className="text-center">
                  <Image
                    src={photoPreview}
                    alt="Preview"
                    width={160}
                    height={160}
                    className="mx-auto max-h-40 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPhoto(null);
                      setPhotoPreview(null);
                    }}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label className="cursor-pointer">
                      <span className="text-orange-600 hover:text-orange-500">
                        Upload a photo
                      </span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handlePhotoChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Cuisines * ({selectedCuisines.length} selected)
            </label>
            <div className="max-h-48 overflow-y-auto border rounded-lg">
              {Object.entries(cuisinesByCategory).map(([category, categorycuisines]) => (
                <div key={category} className="p-3 border-b last:border-b-0">
                  <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categorycuisines.map((cuisine) => (
                      <label
                        key={cuisine.id}
                        className={`flex items-center p-2 rounded cursor-pointer border ${
                          selectedCuisines.includes(cuisine.id)
                            ? 'bg-orange-100 border-orange-300'
                            : 'hover:bg-gray-50 border-transparent'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCuisines.includes(cuisine.id)}
                          onChange={() => handleCuisineToggle(cuisine.id)}
                          className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <span className="text-sm">{cuisine.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption (optional)
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Tell us about your experience..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || selectedCuisines.length === 0 || !photo}
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Logging...' : 'Log Cuisines'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}