"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import ImageUpload from "@/components/ImageUpload";

interface Project {
  _id?: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  featured: boolean;
}

interface Blog {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  image: string;
  published: boolean;
}

interface TIL {
  _id?: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  codeSnippet?: string;
  codeLanguage?: string;
  officialDocsUrl?: string;
}

interface Hero {
  name: string;
  title: string;
  description: string;
  image: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [tils, setTILs] = useState<TIL[]>([]);
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("adminToken");
      
      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.success) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("adminToken");
          router.push("/admin/login");
        }
      } catch (error) {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
      } finally {
        setAuthLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [activeTab, isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "projects") {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data.data || []);
      } else if (activeTab === "blogs") {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data.data || []);
      } else if (activeTab === "til") {
        const res = await fetch("/api/til");
        const data = await res.json();
        setTILs(data.data || []);
      } else if (activeTab === "hero") {
        const res = await fetch("/api/hero");
        const data = await res.json();
        setHero(data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, type: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      const res = await fetch(`/api/${type}/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
        alert("Deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Error deleting item");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const handleSave = async (data: any, type: string, id?: string) => {
    try {
      // Hero always uses PUT method since there's only one hero record
      const url = id ? `/api/${type}/${id}` : `/api/${type}`;
      const method = (id || type === "hero") ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        fetchData();
        setShowForm(false);
        setEditingItem(null);
        alert(`${id || type === "hero" ? "Updated" : "Created"} successfully!`);
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || "Failed to save"}`);
      }
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error saving item");
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-400">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Only render dashboard if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex justify-between items-start"
        >
          <div>
            <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
              <MdDashboard className="text-purple-500" />
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Manage your portfolio content</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg flex items-center gap-2 transition-all"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {["projects", "blogs", "til", "hero"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setShowForm(false);
                setEditingItem(null);
              }}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Add New Button */}
        {activeTab !== "hero" && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingItem(null);
            }}
            className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            <FaPlus /> Add New {activeTab.slice(0, -1)}
          </button>
        )}

        {/* Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Projects List */}
            {activeTab === "projects" && !showForm && (
              <ProjectsList
                projects={projects}
                onEdit={(project) => {
                  setEditingItem(project);
                  setShowForm(true);
                }}
                onDelete={(id) => handleDelete(id, "projects")}
              />
            )}

            {/* Blogs List */}
            {activeTab === "blogs" && !showForm && (
              <BlogsList
                blogs={blogs}
                onEdit={(blog) => {
                  setEditingItem(blog);
                  setShowForm(true);
                }}
                onDelete={(id) => handleDelete(id, "blogs")}
              />
            )}

            {/* TIL List */}
            {activeTab === "til" && !showForm && (
              <TILList
                tils={tils}
                onEdit={(til) => {
                  setEditingItem(til);
                  setShowForm(true);
                }}
                onDelete={(id) => handleDelete(id, "til")}
              />
            )}

            {/* Hero Form */}
            {activeTab === "hero" && (
              <HeroForm
                hero={hero}
                onSave={(data) => handleSave(data, "hero")}
              />
            )}

            {/* Forms */}
            {showForm && activeTab === "projects" && (
              <ProjectForm
                project={editingItem}
                onSave={(data) => handleSave(data, "projects", editingItem?._id)}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}

            {showForm && activeTab === "blogs" && (
              <BlogForm
                blog={editingItem}
                onSave={(data) => handleSave(data, "blogs", editingItem?._id)}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}

            {showForm && activeTab === "til" && (
              <TILForm
                til={editingItem}
                onSave={(data) => handleSave(data, "til", editingItem?._id)}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Projects List Component
function ProjectsList({ projects, onEdit, onDelete }: any) {
  return (
    <div className="grid gap-4">
      {projects.map((project: Project) => (
        <div
          key={project._id}
          className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-3">{project.description}</p>
              <div className="flex gap-2 flex-wrap mb-2">
                {project.tech?.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-sm text-gray-500">
                {project.github && <span>GitHub: {project.github}</span>}
                {project.live && <span>Live: {project.live}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(project)}
                className="p-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(project._id)}
                className="p-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Blogs List Component
function BlogsList({ blogs, onEdit, onDelete }: any) {
  return (
    <div className="grid gap-4">
      {blogs.map((blog: Blog) => (
        <div
          key={blog._id}
          className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-400 mb-3">{blog.excerpt}</p>
              <div className="flex gap-2 flex-wrap mb-2">
                {blog.tags?.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                Status: {blog.published ? "Published" : "Draft"}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(blog)}
                className="p-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(blog._id)}
                className="p-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// TIL List Component
function TILList({ tils, onEdit, onDelete }: any) {
  return (
    <div className="grid gap-4">
      {tils.map((til: TIL) => (
        <div
          key={til._id}
          className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{til.title}</h3>
              <p className="text-gray-400 mb-3">{til.content}</p>
              {til.category && (
                <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded text-sm">
                  {til.category}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(til)}
                className="p-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(til._id)}
                className="p-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Project Form Component
function ProjectForm({ project, onSave, onCancel }: any) {
  const [formData, setFormData] = useState(
    project || {
      title: "",
      description: "",
      tech: [],
      github: "",
      live: "",
      image: "",
      featured: false,
    }
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-6">
        {project ? "Edit Project" : "Add New Project"}
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 h-32"
        />
        <input
          type="text"
          placeholder="Technologies (comma separated)"
          value={formData.tech?.join(", ")}
          onChange={(e) => setFormData({ ...formData, tech: e.target.value.split(",").map((t: string) => t.trim()) })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <input
          type="text"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <input
          type="text"
          placeholder="Live URL"
          value={formData.live}
          onChange={(e) => setFormData({ ...formData, live: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <ImageUpload
          label="Project Image"
          currentImage={formData.image}
          onUpload={(url) => setFormData({ ...formData, image: url })}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-5 h-5"
          />
          <span>Featured Project</span>
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => onSave(formData)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <FaSave /> Save
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/10 transition-all"
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Blog Form Component
function BlogForm({ blog, onSave, onCancel }: any) {
  const [formData, setFormData] = useState(
    blog || {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      tags: [],
      image: "",
      published: false,
    }
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-6">
        {blog ? "Edit Blog" : "Add New Blog"}
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <input
          type="text"
          placeholder="Slug (URL friendly)"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <textarea
          placeholder="Excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 h-24"
        />
        <textarea
          placeholder="Content (Markdown supported)"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 h-48"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={formData.tags?.join(", ")}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map((t: string) => t.trim()) })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <ImageUpload
          label="Blog Cover Image"
          currentImage={formData.image}
          onUpload={(url) => setFormData({ ...formData, image: url })}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="w-5 h-5"
          />
          <span>Published</span>
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => onSave(formData)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <FaSave /> Save
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/10 transition-all"
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// TIL Form Component
function TILForm({ til, onSave, onCancel }: any) {
  const [formData, setFormData] = useState(
    til || {
      title: "",
      content: "",
      category: "",
      tags: [],
      codeSnippet: "",
      codeLanguage: "",
      officialDocsUrl: "",
    }
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-6">
        {til ? "Edit TIL" : "Add New TIL"}
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title (e.g., GitHub Actions - Matrix Strategy)"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <textarea
          placeholder="Description (e.g., Use matrix to run multiple OS or versions in parallel)"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 h-24"
        />
        <input
          type="text"
          placeholder="Category (optional)"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <input
          type="text"
          placeholder="Tags (comma separated, e.g., devops, githubactions)"
          value={formData.tags?.join(", ")}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map((t: string) => t.trim()).filter(Boolean) })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <textarea
          placeholder="Code Snippet (optional)"
          value={formData.codeSnippet}
          onChange={(e) => setFormData({ ...formData, codeSnippet: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 h-40 font-mono text-sm"
        />
        <input
          type="text"
          placeholder="Code Language (e.g., yaml, python, javascript)"
          value={formData.codeLanguage}
          onChange={(e) => setFormData({ ...formData, codeLanguage: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <input
          type="url"
          placeholder="Official Docs URL (optional)"
          value={formData.officialDocsUrl}
          onChange={(e) => setFormData({ ...formData, officialDocsUrl: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <div className="flex gap-4">
          <button
            onClick={() => onSave(formData)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <FaSave /> Save TIL
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/10 transition-all"
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Hero Form Component
function HeroForm({ hero, onSave }: any) {
  const [formData, setFormData] = useState(
    hero || {
      name: "Sachinandan Yadav",
      title: "Full Stack Developer",
      description: "",
      image: "",
      social: {
        github: "",
        linkedin: "",
        twitter: "",
        email: "",
      },
    }
  );

  // Update form data when hero prop changes
  useEffect(() => {
    if (hero) {
      setFormData(hero);
    }
  }, [hero]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-6">Edit Hero Section</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 h-32"
        />
        <ImageUpload
          label="Profile Image"
          currentImage={formData.image}
          onUpload={(url) => setFormData({ ...formData, image: url })}
        />
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Social Links</h4>
          <input
            type="text"
            placeholder="GitHub URL"
            value={formData.social?.github || ""}
            onChange={(e) => setFormData({ ...formData, social: { ...formData.social, github: e.target.value } })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={formData.social?.linkedin || ""}
            onChange={(e) => setFormData({ ...formData, social: { ...formData.social, linkedin: e.target.value } })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            placeholder="Twitter URL"
            value={formData.social?.twitter || ""}
            onChange={(e) => setFormData({ ...formData, social: { ...formData.social, twitter: e.target.value } })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            placeholder="Email"
            value={formData.social?.email || ""}
            onChange={(e) => setFormData({ ...formData, social: { ...formData.social, email: e.target.value } })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>
        <button
          onClick={() => onSave(formData)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <FaSave /> Save Changes
        </button>
      </div>
    </div>
  );
}
