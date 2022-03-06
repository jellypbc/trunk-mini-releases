import { supabase } from '../../lib/supabase-client'
import { DEFAULT_SOURCE_FILES_BUCKET } from '../../lib/constants'

export default async function uploadFileToSupabase(file: File, sourceURL: string){
  console.log('uploading file to supabase...', file, sourceURL)
  try {
    let { error : uploadError } = await supabase.storage
    .from(DEFAULT_SOURCE_FILES_BUCKET)
    .upload(sourceURL, file)

    if (uploadError){
      throw uploadError
    }
  } catch (error : any) {
    alert(error.message)
  } finally {
    console.log(`uploaded file ${sourceURL} to supabase`)
  }
}