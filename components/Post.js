import { MDXRemote } from 'next-mdx-remote'

import Head from 'next/head'
import Link from 'next/link'
//import dynamic from 'next/dynamic'

function A({ href, children }) {
    return <Link href={href}>
        <span className="text-blue-500 hover:text-blue-300 transition-all cursor-pointer">
            {children}
        </span>
    </Link>
}

function Header({ children }) {
    return <div className="font-display text-3xl">{children}</div>
}

const components = {
    a: A,
    strong: ({ children }) =>
        <span className='text-xl font-display font-bold'>{children}</span>,
    pre: ({ children }) =>
        <pre className='border p-5 rounded my-5 w-auto overflow-scroll'>
            {children}
        </pre>,
    ol: ({ children }) =>
        <ol className='list-decimal'>{children}</ol>,
    li: ({ children }) =>
        <li className='my-2 ml-5'>{children}</li>,
    h1: ({ children }) => <Header>{children}</Header>,
    p: ({ children }) => <div className='my-5'>{children}</div>,
    ul: ({ children }) =>
        <ul className='list-[square]'>{children}</ul>,
    Head,
}

//  < MDXRemote { ...source } components = { components } />

import { motion } from 'framer-motion';

const Column = ({ children, isFigure }) =>
    <div
        className="w-1/2 flex pb-5"
        style={{
            backgroundColor: (isFigure ? "#F5F5F5" : "")
        }}>
        <div className='m-16'>
            {children}
        </div>
    </div >

function FadeIn({ children }) {
    return <motion.div
        initial={{
            opacity: 0
        }}
        whileInView={{
            opacity: 1
        }}
        transition={{
            duration: 0.3
        }}
        viewport={{
            margin: "-100px 0px -300px 0px"
        }}
    >
        {children}
    </motion.div>
}

function Sticky({ children }) {
    return <div className='sticky top-16'>
        <FadeIn>{children}</FadeIn>
    </div >
}

function FigurePair({ figure, annotation }) {
    return <div className="w-screen min-h-screen flex">
        <Column>
            <Sticky>{annotation}</Sticky>
        </Column>
        <Column isFigure>
            <Sticky>{figure}</Sticky>
        </Column>

    </div>
}

function Title({ frontMatter, timeToRead }) {
    return <div>
        <span className=''>
            <div className='font-display text-5xl'>
                {frontMatter.title}
            </div>


            <div className="h-5"></div>


            <A href="/blog">
                <span className="text-gray-400 font-semibold hover:text-gray-200 transition-all">
                    {"<---"}
                </span>
            </A>

            <span className='text-gray-400 float-right'> {timeToRead}</span>

        </span>

        {
            frontMatter.description && <p>{frontMatter.description}</p>
        }

    </div>
}

export default function Post({ s, frontMatter, timeToRead }) {
    var pairs = s.map(source => {
        var figure = <MDXRemote {...source.figure} components={components} />
        var annotation = <MDXRemote {...source.annotation} components={components} />

        return <FigurePair figure={annotation} annotation={figure} />
    })

    return <div>
        <FigurePair figure={<></>} annotation={
            <Title frontMatter={frontMatter} timeToRead={timeToRead} />
        } />

        <main className='text-justify'>
            {pairs}
        </main>
    </div >
}