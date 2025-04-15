/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import IssueCard from "./IssueCard";
import { CreateIssueForm } from "./CreateIssueForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchIssues } from "@/redux/Issue/Issue.action";

export function IssueList({ title, status, headerClassName = "", containerClassName = "" }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { issue } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchIssues(id));
  }, [id]);

  return (
    <div className={containerClassName}>
      <Dialog>
        <Card className="w-full md:w-[300px] lg:w-[310px]">
          <CardHeader className={headerClassName}>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-2">
              {issue.issues.filter((item)=>item.status==status).map((item) => (
                <IssueCard item={item} key={item.id} />
              ))}
            </div>
          </CardContent>
          <CardFooter className="px-2">
            <DialogTrigger>
              <Button
                className="w-full border flex items-center gap-2"
                variant="outline"
              >
                <PlusIcon /> <span>Tạo công việc</span>
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent className="border-none w-[300px]">
          <DialogHeader>
            <DialogTitle>Tạo công việc</DialogTitle>
          </DialogHeader>
          <CreateIssueForm status={status} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
