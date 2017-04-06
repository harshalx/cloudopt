# cloudopt - The AWS Clod Optimizer project

With a growing AWS footprint, the bills climb quickly and become a major concern to the management. This puts the AWS admins to the task of establishing governance and forcing some 
policies within the teams. This project aims at defining and standardizing those policies and automating the task of cleaning up the instances once those policy requirements are met. 

for e.g. Admins define a policy that all instances not having the "Deployment" tag will only have a time to live of 10 days. If nothing is done to this instance within 10 days to extend its TTL 
a sweeper process will kill it. This reduces un-necessary instances running around for long and saves money. All thresolds are configurable.