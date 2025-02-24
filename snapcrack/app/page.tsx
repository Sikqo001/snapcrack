"use client"

import { useEffect, useState } from "react"
import { Ghost, Shield, Zap, Terminal, Download, Book } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MatrixRain } from "@/components/matrix-rain"
import type { Post } from "@/app/api/posts/route"

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setRecentPosts(data.slice(0, 3))
    } catch (error) {
      console.error("Error fetching posts:", error)
      setRecentPosts([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-primary">
      <MatrixRain />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex justify-center mb-4">
            <Badge variant="destructive">v3.5 LATEST VERSION</Badge>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-center mb-8">SNAPCRACK</h1>
          <p className="text-xl md:text-2xl text-center text-foreground/90 max-w-2xl mx-auto mb-8">
            {"Advanced Snapchat cracking with 99.9% success rate"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link href="/buy">
              <Button size="lg" className="min-w-[200px] text-lg">
                BUY NOW - 39€
              </Button>
            </Link>
            <Link href="/leaks">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px] text-lg"
              >
                <Terminal className="mr-2 h-4 w-4" />
                SnapCrack Leaks
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12">Advanced Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-background/50 border-primary/50 hover:border-primary transition-all">
            <CardContent className="p-6">
              <Ghost className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2 text-primary">Stealth Mode</h3>
              <p className="text-foreground/80">Undetectable operation with advanced cloaking technology.</p>
            </CardContent>
          </Card>

          <Card className="bg-background/50 border-primary/50 hover:border-primary transition-all">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2 text-primary">Bypass Protection</h3>
              <p className="text-foreground/80">Advanced algorithms to bypass all security measures.</p>
            </CardContent>
          </Card>

          <Card className="bg-background/50 border-primary/50 hover:border-primary transition-all">
            <CardContent className="p-6">
              <Zap className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2 text-primary">Fast Processing</h3>
              <p className="text-foreground/80">Crack accounts in seconds with our optimized engine.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12">Recent Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-3 flex justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            recentPosts.map((post) => (
              <Card key={post.id} className="bg-background/50 border-primary/50 hover:border-primary transition-all">
                <CardContent className="p-4">
                  <div className="relative aspect-[4/5] mb-4">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Result preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <Badge className="absolute top-2 left-2">Featured</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => window.open(post.megaLink, "_blank")}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Get Mega
                    </Button>
                    {post.tutorialLink && (
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(post.tutorialLink, "_blank")}
                      >
                        <Book className="mr-2 h-4 w-4" />
                        Tutorial
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 relative z-10">
        <div className="container mx-auto px-4 text-center text-foreground/60">
          <p>{"Use responsibly // For educational purposes only"}</p>
        </div>
      </footer>
    </div>
  )
}
