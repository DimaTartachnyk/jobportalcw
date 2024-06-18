import JobListing from "@/components/job-listing";
import {currentUser} from "@clerk/nextjs/server";
import {
    fetchJobApplicationsForCandidate,
    fetchJobApplicationsForRecruiter,
    fetchJobsForCandidateAction,
    fetchJobsForRecruiterAction,
    fetchProfileAction
} from "@/actions";


async function JobsPage() {
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);

    const jobList = profileInfo?.role === 'candidate'
        ? await fetchJobsForCandidateAction()
        : await fetchJobsForRecruiterAction(user?.id);


    const getJobApplicationList =
        profileInfo?.role === "candidate"
            ? await fetchJobApplicationsForCandidate(user?.id)
            : await fetchJobApplicationsForRecruiter(user?.id);


    return (
        <JobListing
            user={JSON.parse(JSON.stringify(user))}
            profileInfo={profileInfo}
            jobList={jobList}
            jobApplications={getJobApplicationList}
        />
    )
}

export default JobsPage;