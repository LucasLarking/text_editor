import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CACHE_KEY_TEXT, CACHE_KEY_TEXTS, text_model } from "./text_model";
import axios from "axios";


const useEditText = (document_id: number, text_id: number) => {

    const queryClient = useQueryClient();
    return useMutation<text_model, Error, text_model>({
        mutationFn: (text_model: text_model) => axios.put<text_model>(`http://127.0.0.1:8000/api/documents/${document_id}/texts/${text_id}/`, text_model, {

        })
        .then(res => res.data),
        onSuccess: (res) => {
            queryClient.invalidateQueries();
        }
    })

}

export default useEditText;