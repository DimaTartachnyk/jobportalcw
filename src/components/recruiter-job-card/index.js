'use client';

import JobIcon from "@/components/job-icon";
import CommonCard from "@/components/common-card";
import {Button} from "@/components/ui/button";

function  RecruiterJobCard ({jobItem}){
    return <div>
        <CommonCard
        icon={<JobIcon/>}
        title={jobItem?.title}
        footerContent={
            <Button  className="flex h-11 items-center justify-center px-5">10 Applicants</Button>
        }/>

    </div>
}

export default RecruiterJobCard;