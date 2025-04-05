import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const RepoCard = ({ repo }) => {
  return (
    <Card key={repo.id} className="p-4 bg-white shadow-md rounded-lg">
      <CardContent>
        <h3 className="text-xl font-bold">{repo.name}</h3>
        <p className="text-gray-600 text-sm">{repo.description || "No description available."}</p>
        <div className="mt-2 flex space-x-2">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              <FaGithub className="mr-1" /> View Repo
            </Button>
          </a>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
              <Button>
                <FaExternalLinkAlt className="mr-1" /> Live Demo
              </Button>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RepoCard;
