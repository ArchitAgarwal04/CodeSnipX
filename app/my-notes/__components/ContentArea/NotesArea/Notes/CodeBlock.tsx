'use client'
import { useGlobalContext } from '@/ContextApi';
import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { oneDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'; 

interface CodeBlockProps {
    language: string;
    code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language , code }) => {
    const { darkModeObject: { darkMode } } = useGlobalContext();

    return (
        <div className='rounded-md overflow-hidden text-sm'>
            <SyntaxHighlighter language={language} style={darkMode[1].isSelected ? oneDark : materialLight}>
                {code}
            </SyntaxHighlighter>
        </div>
    );
}

export default CodeBlock;
