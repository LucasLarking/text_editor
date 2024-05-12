import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { CACHE_KEY_TEXT, text_model } from "./text_model"


const useGetText = (document_id: number, text_id: number) => {
    const fetchText = () => axios.get<text_model>(`http://127.0.0.1:8000/api/documents/${document_id}/texts/${text_id}/`)
        .then(res => res.data)

    return useQuery<text_model, Error>({
        queryKey: CACHE_KEY_TEXT,
        queryFn: fetchText
    })
}

export default useGetText;