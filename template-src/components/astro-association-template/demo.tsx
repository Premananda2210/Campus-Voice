"use client"

import AstroAssociationTemplate from "@/components/ui/astro-association-template"

export default function Demo() {
  return (
    <>
      <style>{`[data-section="nights"]{display:none}.aa-tiers{display:none}[data-section="join"] .aa-meta{display:none}.aa-issue.aa-issue,.aa-issue-big.aa-issue-big{display:none}[data-section="projects"] .aa-stage-body,[data-section="projects"] .aa-proj-head .aa-label{display:none}.aa-foot-end .aa-icon{display:none}.aa-foot-end .aa-toggle{margin-left:auto}`}</style>
      <AstroAssociationTemplate
        paletteSwitcher={false}
        brand="Campus Voice"
        navCta="Sign In"
        onNavCta={() => { location.hash = "signin" }}
        nav={[
          { label: "My Complaints", target: "mission" },
          { label: "Complaint Status", target: "projects" },
          { label: "Sign In", target: "#signin" },
        ]}
        hero={{
          wordmark: "Voice",
          issue: "#001",
          title: "CAMPUS\nVOiCE",
          blurb:
            "Campus life runs on many things, from hostels and classrooms to Wi-Fi and water. When something breaks, we raise it together, track it openly and get it fixed.",
          credit: "Campus Voice · Your voice, your campus, your change",
          primaryCta: "File a complaint",
          secondaryCta: "Track issues",
          hint: "",
        }}
        mission={{
          bandTitle: "CAMPUS\nVOiCE",
          kicker: "CAMPUS VOICE PROJECT",
          meta: [],
          stats: [
            { value: "1,840+", label: "Complaints Filed" },
            { value: "312", label: "Completed" },
          ],
        }}
        projects={[
          {
            code: "#099",
            title: "Dark-Sky Census",
            summary: "Members measure how bright the night is above their own street.",
            detail:
              "A pocket meter, a free app and ten minutes after midnight. Every reading lands on a public map that city planners and lighting engineers use to argue for darker streets.",
            status: "ongoing",
            progress: 0.74,
            goal: "7,412 of 10,000 readings",
            cta: "Log a reading",
          },
        ]}
        nights={[]}
        tiers={[]}
        join={{
          emailPlaceholder: "Your roll number",
          button: "Print my ID card",
        }}
        projectsCopy={{
          title: "CAMPUS\nVOiCE",
          issue: "1",
          ribbonText: "campus voice",
        }}
        footer={{
          bandTitle: "CAMPUS\nVOiCE",
          tagline: "YOUR VOICE. YOUR CAMPUS. YOUR CHANGE.",
          credit: "CAMPUS VOICE · RUN BY ITS STUDENTS",
          links: [],
        }}
      />
    </>
  )
}
