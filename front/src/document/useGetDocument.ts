import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { CACHE_KEY_DOCUMENT_FILE, document_file } from "./Document"


const useGetDocument = (document_id: number) => {

    const fetchDocument = () => axios.get<document_file>(`http://127.0.0.1:8000/api/documents/${document_id}/`)
        .then(res => res.data)

    return useQuery<document_file, Error>({
        queryKey: CACHE_KEY_DOCUMENT_FILE,
        queryFn: fetchDocument
    })
}

export default useGetDocument