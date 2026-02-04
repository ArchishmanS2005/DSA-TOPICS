import { notFound } from 'next/navigation'
import { getFileContent, getTopics } from '@/lib/dsa'
import { CodeViewer } from '@/components/code-viewer/code-viewer'

interface PageProps {
    params: Promise<{
        topic: string
        file: string
    }>
}

export async function generateStaticParams() {
    const topics = getTopics()
    const params: { topic: string; file: string }[] = []

    for (const topic of topics) {
        for (const file of topic.files) {
            params.push({
                topic: topic.name,
                file: file
            })
        }
    }

    return params
}

export async function generateMetadata({ params }: PageProps) {
    const { topic, file } = await params
    const decodedTopic = decodeURIComponent(topic)
    const decodedFile = decodeURIComponent(file)

    return {
        title: `${decodedFile} | ${decodedTopic} | DSA Visualizer`,
        description: `View and analyze ${decodedFile} implementation in C`
    }
}

export default async function CodePage({ params }: PageProps) {
    const { topic, file } = await params
    const decodedTopic = decodeURIComponent(topic)
    const decodedFile = decodeURIComponent(file)

    const fileData = getFileContent(decodedTopic, decodedFile)

    if (!fileData) {
        notFound()
    }

    return (
        <div className="h-full flex flex-col">
            <CodeViewer
                code={fileData.content}
                filename={fileData.name}
                topic={fileData.topic}
            />
        </div>
    )
}
