import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "HackOrbit Blog - Latest Updates, Tips & Tech Insights",
  description:
    "Stay updated with HackOrbit 2025 news, hackathon preparation tips, technology insights, and success stories from participants.",
  keywords:
    "hackathon blog, coding tips, tech insights, programming tutorials, hackathon preparation, AI ML tutorials, blockchain guides",
}

const blogPosts = [
  {
    id: 1,
    title: "How to Prepare for Your First Hackathon: A Complete Guide",
    excerpt:
      "Essential tips and strategies to excel in your first hackathon experience, from team formation to final presentation.",
    author: "DLG Team",
    date: "2024-12-15",
    category: "Preparation",
    readTime: "8 min read",
    slug: "first-hackathon-guide",
  },
  {
    id: 2,
    title: "Top 10 AI/ML Project Ideas for HackOrbit 2025",
    excerpt: "Innovative artificial intelligence and machine learning project ideas that could win you the hackathon.",
    author: "Tech Mentors",
    date: "2024-12-10",
    category: "AI/ML",
    readTime: "6 min read",
    slug: "ai-ml-project-ideas",
  },
  {
    id: 3,
    title: "Building Your First DApp: Web3 Development Basics",
    excerpt: "Learn the fundamentals of decentralized application development for the Web3 & Blockchain theme.",
    author: "Blockchain Experts",
    date: "2024-12-05",
    category: "Web3",
    readTime: "12 min read",
    slug: "web3-dapp-basics",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 font-mono">
            HackOrbit Blog
          </h1>
          <p className="text-xl text-blue-100/80 font-mono max-w-3xl mx-auto">
            <span className="text-blue-400">{">"}</span> Latest updates, preparation tips, and tech insights for
            HackOrbit 2025
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id}>
              <Card className="group bg-black/40 border-blue-500/30 backdrop-blur-xl hover:border-blue-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">{post.category}</Badge>
                    <span className="text-blue-400/60 font-mono text-sm">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-blue-300 font-mono text-lg group-hover:text-blue-200 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-blue-100/80 font-mono">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-blue-400/60 font-mono mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-mono transition-colors group/link"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
