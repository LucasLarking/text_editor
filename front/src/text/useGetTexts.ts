import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { CACHE_KEY_TEXTS, text_model } from "./text_model"


const useGetTexts = (document_id: number) => {
    const fetchTexts = () => axios.get<text_model[]>(`http://127.0.0.1:8000/api/documents/${document_id}/texts/`)
        .then(res => res.data)

    return useQuery<text_model[], Error>({
        queryKey: [CACHE_KEY_TEXTS, document_id],
        queryFn: fetchTexts
    })
}

export default useGetTexts;