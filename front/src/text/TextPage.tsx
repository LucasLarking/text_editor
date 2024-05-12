import { useEffect, useRef, useState } from "react";
import { listen_for_up_arrow, useActiveLineStore } from "../store";
import useEditText from "./useChangeText";
import { text_model } from "./text_model";


interface Props {
    document_id: number;
    is_fist: boolean;
    is_last: boolean;
    text: text_model;
    focus_next_input: (focused_number: number) => void;
    focused_input: number;
}

const TextPage = ({ document_id, is_fist, is_last, text, focus_next_input, focused_input }: Props) => {
    const [user_content, set_user_content] = useState('Hello im under the water');
    const [input_value, set_input_value] = useState(text.content);
    const [heading_level, set_heading_level] = useState(text.heading_level);
    const [isClicked, setIsClicked] = useState(false);
    const { index, setIndex, increment, decrement } = useActiveLineStore();
    const [text_height, set_text_height] = useState<number>(0);
    const editTextMutation = useEditText(document_id, text.id);
    const heading_ref = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLInputElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (headerRef.current) {
            set_text_height(headerRef.current.clientHeight);
        }
    })

    useEffect(() => {
        listen_for_up_arrow();
    }, []);

    const handleClick = () => {
        setIsClicked(true);
        setIndex(text.id);
        console.log(index);
        focus_next_input(text.id);

    };

    const handle_input_change = (e: React.ChangeEvent<HTMLInputElement>) => {
        // set_input_value(e.target.value)
      

        const newContent = e.currentTarget.textContent || '';
        set_input_value(newContent);
    }


    const handleKeyDown = (e: React.KeyboardEvent<HTMLParagraphElement>, is_content_input: boolean) => {
        const selection = window.getSelection();
        if (!selection) return; // Ensure selection exists

        const range = selection.getRangeAt(0);
        const { startOffset, endOffset } = range;
        if (e.key === 'ArrowUp' && !is_fist) {
            console.log(text.id)
            focus_next_input(text.id - 1);



        }
        else if (e.key === 'ArrowDown' && !is_last) {
            focus_next_input(text.id + 1);
        }

        // else if (e.key === 'ArrowLeft' && e.currentTarget.selectionStart === 0) {
        else if (e.key === 'ArrowLeft' && startOffset === 0) {


            if (is_content_input) {
                heading_ref.current?.focus();
                console.log('change')
            } else if (!is_last) {
                focus_next_input(text.id - 1);
            }
        }
        // else if (e.key === 'ArrowRight' && e.currentTarget.selectionStart === e.currentTarget.value.length) {
        else if (e.key === 'ArrowRight' && endOffset === e.currentTarget.textContent?.length) {

            if (is_content_input && !is_last) {
                focus_next_input(text.id + 1);
            } else {
                // console.log('go back', e.currentTarget.value.length)
                contentRef.current?.focus();
                heading_ref.current?.blur();

            }
        }

        else if (is_content_input) {
            // if (e.key === 'Backspace' && e.currentTarget.selectionStart === 0) {
            if (e.key === 'Backspace' && startOffset === 0) {

                e.preventDefault();
                heading_ref.current?.focus();
                set_heading_level(heading_level.slice(0, -1))

            }
        }


    };


    const updateText = () => {
        editTextMutation.mutate({
            id: text.id,
            document: text.document,
            type: text.type,
            content: input_value,
            heading_level: text.heading_level
        })

    }

    const handleHeadingLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
        // set_heading_level(e.target.value)

        const newContent = e.currentTarget.textContent || '';
        set_heading_level(newContent);
    }

    return (
        <>
            {focused_input == text.id && (

                <div>
                    {/* <input ref={heading_ref} onKeyDown={(e) => handleKeyDown(e, false)} value={heading_level} onChange={handleHeadingLevel}></input> */}
                    {/* <input ref={contentRef} onBlur={updateText} onKeyDown={(e) => handleKeyDown(e, true)} value={input_value} onChange={handle_input_change} style={{ height: text_height }} autoFocus ></input> */}
                    <h2 ref={heading_ref} onKeyDown={(e) => handleKeyDown(e, false)} onChange={handleHeadingLevel}>{heading_level}</h2>
                    <h2 ref={contentRef} onBlur={updateText} onKeyDown={(e) => handleKeyDown(e, true)} onChange={handle_input_change} style={{ height: text_height }} autoFocus contentEditable>{input_value}</h2>
                </div>
            )}

            {focused_input !== text.id && (

                text.type === 'h1' ? (<h1 ref={headerRef} onClick={handleClick}>{text.content}</h1>)
                    : text.type === 'h2' ? (<h2 ref={headerRef} onClick={handleClick}>{text.content}</h2>)
                        : (<div></div>)
            )}


            {/* <h1 autoFocus contentEditable>asdsd</h1> */}
        </>
    )
}

export default TextPage

