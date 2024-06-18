import JobListing from "@/components/job-listing";
import {currentUser} from "@clerk/nextjs/server";
import {fetchJobsForCandidateAction, fetchJobsForRecruiterAction, fetchProfileAction} from "@/actions";


async function JobsPage() {
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id)

    const jobList = profileInfo?.role === 'candidate' ?
        await fetchJobsForCandidateAction()
        : await fetchJobsForRecruiterAction(user?.id)

    console.log(jobList, "dima")


    return (
        <JobListing
            user={JSON.parse(JSON.stringify(user))}
            profileInfo={profileInfo}
            jobList={jobList}
        />
    )
}

export default JobsPage;