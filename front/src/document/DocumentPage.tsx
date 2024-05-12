import { useParams } from "react-router-dom"
import useGetDocument from "./useGetDocument";
import useGetTexts from "../text/useGetTexts";
import { text_model } from "../text/text_model";
import TextPage from "../text/TextPage";
import { useState } from "react";


const TextDocument = () => {
  const { slug } = useParams();

  const { data: document_file, isLoading: document_loading, error: document_error } = useGetDocument(parseInt(slug!));
  const { data: texts, isLoading: texts_loading, error: texts_error } = useGetTexts(parseInt(slug!));
  const [focused_input, set_focused_input] = useState(0);

  if (document_loading) return (<p>lesson loading</p>)
  if (document_error) return (<p>lesson Error</p>)


  if (texts_loading) return (<p>text loading</p>)
  if (texts_error) return (<p>text Error</p>)


  const focus_next_input = (increment: number) => {
    // Focus on the next input element
    set_focused_input(increment)
  };

  return (
    <>

      <h1>{document_file?.name}</h1>


      <div>
        {texts?.map((text: text_model, index) => (
          <div key={text.id}>
            <TextPage document_id={parseInt(slug!)} is_fist={index === 0} is_last={index === texts.length -1} text={text} focus_next_input={focus_next_input} focused_input={focused_input}/>

          </div>
        ))}
      </div>
    </>
  )
}

export default TextDocument