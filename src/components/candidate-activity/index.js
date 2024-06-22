'use client';


import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import CommonCard from "@/components/common-card";
import JobIcon from "@/components/job-icon";

function CandidateActivity({jobList, jobApplicants}) {

    console.log(jobList, jobApplicants);

    const uniqueStatusArray = [...new Set(jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1))];

    console.log(uniqueStatusArray);

    return (
        <div className="mx-auto max-w-7xl">
            <Tabs defaultValue="Applied" className="w-full">
                <div className="flex items-baseline dark:border-white justify-between border-b pb-6 pt-24">
                    <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
                        Your Activity
                    </h1>
                    <TabsList>
                        {uniqueStatusArray.map((status) => (// eslint-disable-next-line react/jsx-key
                            <TabsTrigger value={status}>{status}</TabsTrigger>))}
                    </TabsList>
                </div>
                <div className="pb-24 pt-6">
                    <div className="container mx-auto p-0 space-y-8">
                        <div className="flex flex-col gap-4">
                            {uniqueStatusArray.map((status) => (// eslint-disable-next-line react/jsx-key
                                <TabsContent className="mb-4" value={status}>
                                    {
                                        jobList.filter((jobItem) => jobApplicants.filter((jobApplication) => jobApplication.status.indexOf(status) > -1)
                                        .findIndex((filteredItemByStatus) => jobItem._id === filteredItemByStatus.jobID) > -1)
                                        .map((finalFilteredItem) => (// eslint-disable-next-line react/jsx-key
                                                <CommonCard icon={<JobIcon/>} title={finalFilteredItem?.title} description={finalFilteredItem?.companyName}/>))
                                    }
                                </TabsContent>))}
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>)
}

export default CandidateActivity;