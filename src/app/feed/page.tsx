'use client';

import React from 'react';
import { StoriesBar } from '@/components/stories';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Send,
  UserCircle,
  Clock
} from 'lucide-react';

export default function SocialFeedPage() {
  const postsList = [
    {
      author: "Dr. Rajesh Kumar",
      time: "2h ago",
      content: "Excited to announce the upcoming National Medical Conference in Delhi! We'll be discussing the latest breakthroughs in Cardiology. Hope to see you all there.",
      likes: "128",
      comments: "24",
      image: null
    },
    {
      author: "Amit Sharma",
      time: "5h ago",
      content: "Just finished my final year surgery rotation. It's been an intense journey but worth every second. Grateful for the mentorship at AIIMS.",
      likes: "84",
      comments: "12",
      image: null
    }
  ];

  const [newPost, setNewPost] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handlePost = async () => {
    if (!newPost.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/social/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newPost })
      });
      if (res.ok) {
        setNewPost('');
        // In a real app, refresh the feed or optimistically update
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-12 pb-20">
      {/* Stories Hub */}
      <section className="space-y-4">
         <h2 className="text-xl font-black tracking-tight text-neutral-400 uppercase tracking-widest text-xs">Stories Hub</h2>
         <StoriesBar />
      </section>

      {/* Create Post Bar */}
      <div className="glass rounded-[2rem] p-4 flex items-center gap-4 bg-white/50 dark:bg-neutral-900/50 shadow-premium border-white/20">
         <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
            <UserCircle className="w-7 h-7" />
         </div>
         <input 
            type="text" 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share something with the community..."
            className="flex-grow bg-transparent outline-none font-medium h-12"
         />
         <div className="flex items-center gap-2 pr-2">
            <button className="w-10 h-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-500 transition-colors">
               <ImageIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={handlePost}
              disabled={loading}
              className="h-10 px-4 rounded-xl bg-brand-primary text-white font-bold text-sm shadow-premium flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50"
            >
               {loading ? '...' : 'Post'} <Send className="w-4 h-4" />
            </button>
         </div>
      </div>

      {/* Post Feed */}
      <div className="space-y-8">
         {postsList.map((post, i) => (
           <PostCard key={i} post={post} />
         ))}
      </div>
    </div>
  );
}

function PostCard({ post }: { post: any }) {
  const [likes, setLikes] = React.useState(parseInt(post.likes));
  const [isLiked, setIsLiked] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);

  const handleLike = async () => {
    try {
      const res = await fetch('/api/social/interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id || 'temp-id', action: 'like' })
      });
      const data = await res.json() as { liked?: boolean; success?: boolean };
      if (data.liked !== undefined) {
        setIsLiked(data.liked);
        setLikes(prev => data.liked ? prev + 1 : prev - 1);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="glass rounded-[2.5rem] p-8 space-y-6 border-white/20 shadow-premium animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Post Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
             <UserCircle className="w-8 h-8" />
           </div>
           <div>
              <h4 className="font-bold text-lg">{post.author}</h4>
              <p className="text-xs font-bold text-neutral-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.time}
              </p>
           </div>
        </div>
        <button className="w-10 h-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-400">
           <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Content */}
      <p className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed font-medium">
        {post.content}
      </p>

      {/* Post Actions */}
      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <button 
              onClick={handleLike}
              className={`h-12 px-6 rounded-2xl flex items-center gap-2 font-bold transition-all ${
                isLiked ? 'bg-red-500/10 text-red-500 shadow-premium scale-105' : 'text-neutral-500 hover:bg-brand-primary/5 hover:text-brand-primary'
              }`}
            >
               <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} /> {likes}
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="h-12 px-6 rounded-2xl flex items-center gap-2 font-bold text-neutral-500 hover:bg-brand-primary/5 hover:text-brand-primary transition-all"
            >
               <MessageCircle className="w-5 h-5" /> {post.comments}
            </button>
         </div>
         <button className="h-12 w-12 rounded-2xl flex items-center justify-center text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
            <Share2 className="w-5 h-5" />
         </button>
      </div>

      {showComments && (
        <div className="pt-6 space-y-4 animate-in slide-in-from-top-4 duration-500">
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 shrink-0" />
              <div className="flex-grow glass rounded-2xl px-4 py-3 flex gap-2">
                 <input 
                   type="text" 
                   placeholder="Add a comment..."
                   className="bg-transparent flex-grow outline-none text-sm font-medium"
                 />
                 <button className="text-brand-primary font-bold text-sm">Post</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
