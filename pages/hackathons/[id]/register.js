import Layout from "@/components/layout";
import PageHeader from "@/components/PageHeader";
import RegisterTeamForm from "@/components/RegisterTeamForm";
import ButtonSecondary from "@/components/ButtonSecondary";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function HackathonRegistration() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [hackathon, setHackathon] = useState([]);
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];

  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id);
    }
  }, [router.isReady]);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        if (id) {
          const data = await fetch(`/api/hackathons/${id} `, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (data.ok) {
            const response = await data.json();
            setHackathon(response);
            setPrices([
              ["1st Place Prize", response.firstPlacePrize],
              ["2nd Place Prize", response.secondPlacePrize],
              ["3rd Place Prize", response.thirdPlacePrize],
            ]);
          } else {
            console.error(
              "Error fetching Registration Hackthon:",
              data.statusText
            );
          }
        }
      } catch (error) {
        console.error("Error fetching hackathon data", error);
      }
    };
    fetchHackathon();
  }, [id]);

  useEffect(() => {
    if (formattedCurrentDate > hackathon.endDate) {
      router.push("/");
    }
  }, [formattedCurrentDate, hackathon.endDate]);

  return (
    <Layout>
      <header>
        <title>GHL | Register a team</title>
      </header>
      {formattedCurrentDate <= hackathon.endDate && (
        <div className="py-4 sm:py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ButtonSecondary
              buttonText={"Back"}
              buttonLink={`/hackathons/${id}/`}
            />
            <div>
              <div className="my-9">
                <h2 className="text-4xl mb-4 lg:text-6xl">
                  Confirm Registration for {hackathon.title} Hackathon
                </h2>
                <p className="text-xl lg:text-2xl">
                  Fill out the form to complete your registration.
                </p>
              </div>
            </div>
            <RegisterTeamForm hackathonId={id} />
          </div>
        </div>
      )}
    </Layout>
  );
}
