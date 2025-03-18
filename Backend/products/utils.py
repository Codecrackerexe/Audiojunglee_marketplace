import os
import tempfile
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import wave
import contextlib

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
        'duration': None,
        'sample_rate': None
    }

    if metadata['format'].lower() == 'wav':
        path = default_storage.save(f'tmp/{file.name}', ContentFile(file.read()))
        temp_file_path = os.path.join(default_storage.location, path)

        try:
            with contextlib.closing(wave.open(temp_file_path, 'r')) as f:
                frames = f.getnframes()
                rate = f.getframerate()
                duration = frames / float(rate)

                metadata['duration'] = duration
                metadata['sample_rate'] = rate
        except Exception as e:
            print(f"Error extracting WAV metadata: {e}")
        finally:
            file.seek(0) #reset file pointer for further use
            default_storage.delete(path) #remove temp file
        
        return metadata

