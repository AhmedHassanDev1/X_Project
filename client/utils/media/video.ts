export const extractThumbnail = (fileURL: string, seekTo = 1): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.muted = true;
        video.playsInline = true;
        video.src = fileURL;

        const revoke = () => URL.revokeObjectURL(fileURL);

        video.onloadedmetadata = () => {
            video.currentTime = Math.min(seekTo, video.duration / 2);
        };

        video.onseeked = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                    else reject(new Error('Failed to extract thumbnail'));
                    revoke();
                }, 'image/jpeg', 0.9);
            } catch (err) {
                revoke();
                reject(err);
            }
        };

        video.onerror = (err) => {
            revoke();
            reject(new Error('Video failed to load: ' + err));
        };
    });
};
