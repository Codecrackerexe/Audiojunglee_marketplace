import os
import tempfile
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import wave
import contextlib
from mutagen import File as MutagenFile

def validate_audio_file(file):
    valid_extensions = ['.mp3','.wav','.flac']
    ext = os.path.splitext(file.name)[1]

    if not ext.lower() in valid_extensions:
        return False, f"Unsupported file extension. supported extensions are: {','.join(valid_extensions)}"
    
    if file.size > 50 * 1024 * 1024:  #(50MB)
        return False, "File size exceeds 50MB limit"
    
    return True, ""
    

def get_audio_metadata(file):
    metadata = {
        'file_size': file.size,
        'format': os.path.splitext(file.name)[1][1:],
        'duration': 0,
        'sample_rate': 44100
    }

    # Save to a temporary file
    path = default_storage.save(f'tmp/{file.name}', ContentFile(file.read()))
    temp_file_path = os.path.join(default_storage.location, path)

    try:
        if metadata['format'].lower() == 'wav':
            with contextlib.closing(wave.open(temp_file_path, 'r')) as f:
                frames = f.getnframes()
                rate = f.getframerate()
                duration = frames / float(rate)

                metadata['duration'] = duration
                metadata['sample_rate'] = rate
        else:
            # Use mutagen for other formats
            audio = MutagenFile(temp_file_path)
            if audio is not None:
                metadata['duration'] = audio.info.length
                if hasattr(audio.info, 'sample_rate'):
                    metadata['sample_rate'] = audio.info.sample_rate
    except Exception as e:
        print(f"Error extracting audio metadata: {e}")
        # Still return the metadata with default values
    finally:
        file.seek(0)  # Reset file pointer
        default_storage.delete(path)  # Clean up
    
    return metadata