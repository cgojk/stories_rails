


import React, { useState, useEffect, useRef } from "react";
import ModalAccepting from "../../components/ModalAccepting"; // <-- Adjust path here
import { useNavigate } from "react-router-dom";

export default function Story() {
  const API = import.meta.env.VITE_API_BASE;

  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("signin");
  const [mode, setMode] = useState("auth");
  const navigate = useNavigate();
 

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [storyData, setStoryData] = useState({
    title: "",
    category: "",
    description: "",
    audioFile: null,
    imageFile: null,
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Refs for file inputs to clear them after submit
  const audioInputRef = useRef(null);
  const imageInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setMode("story");
    }
  }, []);

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    const url = authMode === "signin" ? "/auth/signin" : "/auth/signup";
    const payload =
      authMode === "signin"
        ? { email: formData.email, password: formData.password }
        : { ...formData };

    try {
      const authBase = API.replace(/\/api$/, "");
      const res = await fetch(`${authBase}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Authentication failed");
        return;
      }

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setMode("story");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setMode("auth");
  };

  const handleStoryChange = (e) => {
    const { name, value } = e.target;
    setStoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAudioChange = (e) => {
    setStoryData((prev) => ({ ...prev, audioFile: e.target.files[0] }));
  };

  const handleImageChange = (e) => {
    setStoryData((prev) => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const handleStorySubmit = (e) => {
    e.preventDefault();

    if (!storyData.audioFile) {
      alert("Audio file is required!");
      return;
    }

    setShowConfirmModal(true);
  };

  const submitStory = async () => {
    setShowConfirmModal(false);

    const data = new FormData();
    data.append("name", storyData.title);
    data.append("category", storyData.category);
    data.append("description", storyData.description);
    data.append("audio", storyData.audioFile);
    if (storyData.imageFile) {
      data.append("image", storyData.imageFile);
    }

    try {
      const res = await fetch(`${API}/podcasts`, {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to upload story");

      setShowSuccessModal(true);

      setStoryData({
        title: "",
        category: "",
        description: "",
        audioFile: null,
        imageFile: null,
      });

      // Clear actual file inputs visually
      if (audioInputRef.current) audioInputRef.current.value = "";
      if (imageInputRef.current) imageInputRef.current.value = "";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      {/* AUTH SECTION */}
      {mode === "auth" && (
        <section className="wrapper_container_form container">
          <section className="form_addStory sm-container_form__story">

 {/* Control bar at top like in story mode */}
      <div className="control-bar" >
        <button
          className="button_back"
          onClick={() => navigate(-1)}
          // onClick={() => {
          //   setMode("story"); // Go back to story view
          // }}
        >
          ⬅ Back
        </button>
        {/* <button
          className="button_logout"
          onClick={handleLogout}
        >
          Log out
        </button> */}
      </div>

            <h1 className="form_title_story_singin">
              {authMode === "signin" ? " You need to be signed in to add your audio stories" : "Join us! Create an account to share your journey"}
            </h1>
            {/* <p className="small_subtitle">
            You need to be signed in to add your audio stories and be featured.
          </p> */}
            <form onSubmit={handleAuthSubmit}>
              {authMode === "signup" && (
                <>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleAuthChange}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleAuthChange}
                    required
                  />
                </>
              )}
              <input
                type="email"
                name="email"
                placeholder="carolinagonzalves@curtin.edu.au"
                value={formData.email}
                onChange={handleAuthChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleAuthChange}
                required
              />
              <button className="button_submit_account" type="submit">
                {authMode === "signin" ? "Sign In" : "Sign Up"}{" "}
                <span className="button_arrow">→</span>
              </button>
            </form>

            <button
              className="button_submit__create"
              onClick={() =>
                setAuthMode(authMode === "signin" ? "signup" : "signin")
              }
            >
              {authMode === "signin"
                ? "Create an account"
                : "Already have an account? Sign In"}
            </button>
          </section>
        </section>
      )}

      {/* STORY SUBMIT SECTION */}
      {mode === "story" && (
        <section className="wrapper_container_form">
          <section className="sm-container_form form_addStory">
            
            {/* NEW BUTTON LAYOUT AT TOP-RIGHT */}
            <div
              className="control-bar">
                <button
                className="button_back"
                onClick={() => {
                  handleLogout();
                  setMode("auth");
                }}
              >
                ⬅ Back 
              </button>
              <button className="button_logout" onClick={handleLogout}>Log out
              </button>
              
            </div>

            <p className="paragraph_story">
              Welcome
              {user?.firstName && (
                <>
                  , <span className="username-underline">{user.firstName}</span>!
                </>
              )}
            </p>
            <h2 className="subtitle_form_story">Share Your Journey on the Rails</h2>

            <p className="small_subtitle">
              Thank you for riding with us we can’t wait to hear your voice!
            </p>

            <form onSubmit={handleStorySubmit} encType="multipart/form-data">
              <label className="Label_story">
                Write the title for your story:
                <input
                  type="text"
                  name="title"
                  value={storyData.title}
                  onChange={handleStoryChange}
                  required
                />
              </label>

              <label>
                Category:
                <select
                  name="category"
                  value={storyData.category}
                  onChange={handleStoryChange}
                  required
                >
                  <option value="">-- Select a Category --</option>
                  <option value="Love">Love</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Action">Action</option>
                  <option value="History">History</option>
                  <option value="Crime">Crime</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label>
                Description:
                <textarea
                  name="description"
                  value={storyData.description}
                  onChange={handleStoryChange}
                  required
                />
              </label>

              <label>
                Upload Audio (required):
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioChange}
                  required
                  ref={audioInputRef} 
                />
              </label>

              <label>
                Upload Image (optional):
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={imageInputRef} 
                />
              </label>

              <button className="button_submit__story" type="submit">
                Submit Story
              </button>
            </form>
          </section>
        </section>
      )}




{/* 

      {showConfirmModal && (
        <ModalAccepting
          message="Are you sure you want to post this story?"
          onConfirm={submitStory}
          onCancel={() => setShowConfirmModal(false)}
          confirmText="Post"
          cancelText="Cancel"
        />
      )}

      {showSuccessModal && (
        <ModalAccepting
          message="Your podcast story is added to our website. Thank you for sharing with us!"
          onConfirm={() => setShowSuccessModal(false)}
          cancelText={null}
          confirmText="Close"
        />
      )}
    </>
  );
}
  */}


{/* MODALS */}
      {showConfirmModal && (
        <ModalAccepting
          message="Please review your story before posting:"
          onConfirm={submitStory}
          onCancel={() => setShowConfirmModal(false)}
          confirmText="Publish"
          cancelText="Edit"
        >
          <div className="preview-container">
            <p><strong>Title:</strong> {storyData.title}</p>
            <p><strong>Category:</strong> {storyData.category}</p>
            <p><strong>Description:</strong> {storyData.description}</p>

            {storyData.audioFile && (
              <div>
                <strong>Audio Preview:</strong>
                <audio controls src={URL.createObjectURL(storyData.audioFile)} />
              </div>
            )}

            {storyData.imageFile && (
              <div>
                <strong>Image Preview:</strong>
                <img
                  src={URL.createObjectURL(storyData.imageFile)}
                  alt="Story preview"
                  style={{ maxWidth: "200px", marginTop: "10px", borderRadius: "8px" }}
                />
              </div>
            )}
          </div>
        </ModalAccepting>
      )}

      {showSuccessModal && (
        <ModalAccepting
          message="Your podcast story is added to our website. Thank you for sharing with us!"
          onConfirm={() => setShowSuccessModal(false)}
          cancelText={null}
          confirmText="Close"
        />
      )}
    </>
  );
}