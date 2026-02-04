import fs from 'fs'
import path from 'path'
import type { Topic, FileData } from '@/types/dsa'

const DSA_CODES_DIR = path.join(process.cwd(), '..', 'dsa_codes')

export function getTopics(): Topic[] {
    try {
        const topics = fs.readdirSync(DSA_CODES_DIR, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => {
                const topicPath = path.join(DSA_CODES_DIR, dirent.name)
                const files = fs.readdirSync(topicPath)
                    .filter(file => file.endsWith('.c'))
                    .sort()

                return {
                    name: dirent.name,
                    files
                }
            })
            .filter(topic => topic.files.length > 0)
            .sort((a, b) => a.name.localeCompare(b.name))

        return topics
    } catch (error) {
        console.error('Error reading DSA codes:', error)
        return []
    }
}

export function getFileContent(topic: string, filename: string): FileData | null {
    try {
        const filePath = path.join(DSA_CODES_DIR, topic, filename)

        if (!fs.existsSync(filePath)) {
            return null
        }

        const content = fs.readFileSync(filePath, 'utf-8')

        return {
            name: filename,
            topic,
            content,
            path: filePath
        }
    } catch (error) {
        console.error(`Error reading file ${topic}/${filename}:`, error)
        return null
    }
}

export function getAllFiles(): FileData[] {
    const topics = getTopics()
    const files: FileData[] = []

    for (const topic of topics) {
        for (const filename of topic.files) {
            const fileData = getFileContent(topic.name, filename)
            if (fileData) {
                files.push(fileData)
            }
        }
    }

    return files
}
