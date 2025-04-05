import React, { useEffect, useState } from "react";
import RepoCard from "./RepoCard";

const Experience = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/Lightcoderhub/repos")
      .then((response) => response.json())
      .then((data) => setRepos(data));
  }, []);

  return (
    <section className="max-w-4xl w-full mt-8">
      <h2 className="text-2xl font-semibold mb-4">Experience</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
