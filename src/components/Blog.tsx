import { useEffect, useState } from 'react';
import { supabase, type BlogPost } from '../lib/supabase';
import { Calendar, User } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>Loading articles...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1F2124] mb-4">
            The Hive Journal
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tips, stories, and insights from the world of beeswax and sustainable luxury
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="aspect-video bg-[#F4EDE6] overflow-hidden">
                <img
                  src={post.hero_image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <User size={16} />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#1F2124] mb-3 group-hover:text-[#D69C4A] transition-colors">
                  <a href={`#blog/${post.slug}`}>{post.title}</a>
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
                <a
                  href={`#blog/${post.slug}`}
                  className="inline-block text-sm uppercase tracking-wider text-[#D69C4A] hover:text-[#1F2124] transition-colors font-medium"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
