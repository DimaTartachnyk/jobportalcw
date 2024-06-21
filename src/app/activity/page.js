import {fetchJobApplicationsForCandidate, fetchJobsForCandidateAction} from "@/actions";
import {currentUser} from "@clerk/nextjs/server";


export default async function Activity(){
    const user = await currentUser();
    const jobList = await fetchJobsForCandidateAction();
    const jobApplicants = await fetchJobApplicationsForCandidate(user?.id);

    return(
        <div>
            <h1>Activity</h1>
        </div>
    )
}