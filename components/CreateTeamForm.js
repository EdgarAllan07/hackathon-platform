import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { ArrowRight } from "lucide-react";
import ButtonSecondary from "@/components/ButtonSecondary";
import ButtonPrimary from "./ButtonPrimary";
import AddUserTeam from "./AddUserTeam";

const CreateTeamForm = ({ id }) => {
  const router = useRouter();

  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamAvatarURL, setTeamAvatarURL] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [test, setTest] = useState();

  const create = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const body = {
          teamName,
          teamDescription,
          teamAvatarURL,
          teamMembers,
        };
        await fetch(`/api/team/${id}/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        router.push(`/team/${id}`);
      } else {
        const body = {
          teamName,
          teamDescription,
          teamAvatarURL,
          teamMembers,
        };
        await fetch(`/api/team/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        router.push("/team");
      }
    } catch (error) {
      console.error(error);
    }

    // const forumId = await createForum({ subject, description });
  };

  useEffect(() => {
    const team = async () => {
      try {
        if (id) {
          const response = await fetch(`/api/team/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            const data = await response.json();
            setTeamName(data.name);
            setTeamDescription(data.description);
            setTeamAvatarURL(data.teamAvatar);
            setTeamMembers(data.teamMembers);
            setTest(data);
          } else console.log("Error fetching the:", response.statusText);
        }
      } catch (error) {
        console.log(
          "it's no able to get the data from the database because of ",
          error
        );
      }
    };
    team();
  }, [id]);

  return (
    <>
      <form onSubmit={create}>
        <div className="mt-10 grid md:grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-1">
          <div className="sm:col-span-4">
            <label
              htmlFor="teamName"
              className="block text-sm font-medium leading-6 text-white"
            >
              Team Name
            </label>
            <div className="mb-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="teamName"
                  id="teamName"
                  autoComplete="team-name"
                  onChange={(e) => setTeamName(e.target.value)}
                  className="block rounded-md border-0 py-3 text-white shadow-sm ring-1 ring-inset ring-purple-500 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-field md:w-80 placeholder:opacity-60 placeholder:font-semibold w-full"
                  defaultValue={""}
                  value={teamName}
                  required
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="teamDescription"
              className="block text-sm font-medium leading-6 text-white"
            >
              Team Description
            </label>
            <div className="mb-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="teamDescription"
                  id="teamDescription"
                  autoComplete="team-description"
                  onChange={(e) => setTeamDescription(e.target.value)}
                  className="block rounded-md border-0 py-3 text-white shadow-sm ring-1 ring-inset ring-purple-500 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-field md:w-80 placeholder:opacity-60 placeholder:font-semibold w-full"
                  defaultValue={""}
                  value={teamDescription}
                  required
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="teamAvatarURL"
              className="block text-sm font-medium leading-6 text-white"
            >
              Team Avatar URL
            </label>
            <div className="mb-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="teamAvatarURL"
                  id="teamAvatarURL"
                  autoComplete="team-avatar-url"
                  onChange={(e) => setTeamAvatarURL(e.target.value)}
                  className="block rounded-md border-0 py-3 text-white shadow-sm ring-1 ring-inset ring-purple-500 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-field md:w-80 placeholder:opacity-60 placeholder:font-semibold w-full"
                  defaultValue={""}
                  value={teamAvatarURL}
                  required
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="teamMembers"
              className="block text-sm font-medium leading-6 text-white"
            >
              Team Member Names & Contact Info
            </label>
            <div className="mb-4">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <textarea
                  id="teamMembers"
                  name="teamMembers"
                  rows={3}
                  onChange={(e) => setTeamMembers(e.target.value)}
                  className="block rounded-md border-0 py-3 text-white shadow-sm ring-1 ring-inset ring-purple-500 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-field md:w-80 placeholder:opacity-60 placeholder:font-semibold w-full"
                  defaultValue={""}
                  value={teamMembers}
                  required
                />
              </div>
              {/*<AddUserTeam></AddUserTeam> */}
              <div className="mb-4 mt-6">
                <ButtonPrimary buttonText={"Finish"} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateTeamForm;
