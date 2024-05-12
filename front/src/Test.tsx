import React from 'react'
import useEditText from './text/useChangeText';

const Test = () => {
    const editTextMutation = useEditText(1, 1);


    const handleClick = () => {
        editTextMutation.mutate({
            id: 1,
            document: 1,
            type: 'h2',
            content: 'test2',
            heading_level: "###"
        })

    };
    return (
        <>
        <input onBlur={handleClick}/>
            {/* <button onClick={handleClick}>Click</button> */}
        </>
    )
}

export default Test