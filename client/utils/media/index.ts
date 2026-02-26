type MediaDimensions = {
  width: number;
  height: number;
};

export function getMediaDimensions(file: File | string): Promise<MediaDimensions> {
  return new Promise((resolve, reject) => {
    if (typeof file === "string") {
      // URL
      if (file.endsWith(".mp4") || file.endsWith(".webm") || file.endsWith(".mov")) {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          resolve({ width: video.videoWidth, height: video.videoHeight });
        };
        video.onerror = () => reject(new Error("Failed to load video metadata"));
        video.src = file;
      } else {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = file;
      }
    } else {
      // File object
      const url = URL.createObjectURL(file);
      if (file.type.startsWith("video")) {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          URL.revokeObjectURL(url);
          resolve({ width: video.videoWidth, height: video.videoHeight });
        };
        video.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load video metadata"));
        };
        video.src = url;
      } else if (file.type.startsWith("image")) {
        const img = new Image();
        img.onload = () => {
          URL.revokeObjectURL(url);
          resolve({ width: img.width, height: img.height });
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load image"));
        };
        img.src = url;
      } else {
        reject(new Error("Unsupported media type"));
      }
    }
  });
}