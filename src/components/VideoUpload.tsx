import React, { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase'

interface VideoUploadProps {
  folder: 'reels' | 'portfolio'
  label: string
  onUploadComplete?: (url: string, name: string, type: string) => void
}

const VideoUpload: React.FC<VideoUploadProps> = ({ folder, label, onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [status, setStatus] = useState<string>('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null
    setFile(selected)
    setStatus('')
    setUploadProgress(0)
  }

  const handleUpload = () => {
    if (!file) {
      setStatus('Select a video before uploading.')
      return
    }

    const storageRef = ref(storage, `${folder}/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setUploadProgress(progress)
      },
      (error) => {
        setStatus(`Upload failed: ${error.message}`)
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
        setStatus('Upload complete')
        setFile(null)
        setUploadProgress(100)
        if (onUploadComplete) {
          onUploadComplete(downloadUrl, file.name, file.type || 'video/mp4')
        }
      }
    )
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-white/5 p-6 shadow-xl shadow-black/20">
      <h3 className="text-xl font-semibold text-white mb-4">{label}</h3>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mb-4 block w-full rounded-xl border border-zinc-700 bg-zinc-950/70 p-3 text-sm text-white"
      />
      <button
        type="button"
        onClick={handleUpload}
        className="rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
      >
        Upload video
      </button>
      {uploadProgress > 0 && (
        <div className="mt-4 text-sm text-zinc-300">
          Progress: {uploadProgress}%
        </div>
      )}
      {status && <p className="mt-3 text-sm text-zinc-400">{status}</p>}
    </div>
  )
}

export default VideoUpload
