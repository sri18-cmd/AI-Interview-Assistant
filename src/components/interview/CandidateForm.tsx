"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Candidate } from "@/lib/types";
import { FileUp, Mail, Phone, User, Send, Loader2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { parseResume } from "@/lib/actions";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  resumeContent: z.string().optional(),
});

type CandidateFormProps = {
  onStart: (candidate: Candidate) => void;
};

export function CandidateForm({ onStart }: CandidateFormProps) {
  const { toast } = useToast();
  const [isParsing, setIsParsing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      resumeContent: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!values.resumeContent) {
      toast({
        title: "Resume Required",
        description: "Please upload a resume to start the interview.",
        variant: "destructive",
      });
      return;
    }
    const { resumeContent, ...candidateData } = values;
    onStart({ ...candidateData, id: values.email, resumeContent });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // We can't properly parse docx/pdf on the client easily,
    // so for now we'll stick to .txt for parsing, but allow upload.
    // The content will be stored for the summary.
    const isTxtFile = file.type === 'text/plain';

    setIsParsing(true);
    toast({
      title: "Reading Resume...",
      description: "Please wait while we process your file.",
    });

    const reader = new FileReader();
    reader.onload = async (event) => {
        const resumeContent = event.target?.result as string;
        if (!resumeContent) {
            toast({
                title: "Error Reading File",
                description: "Could not read the resume file. Please try again.",
                variant: "destructive",
            });
            setIsParsing(false);
            return;
        }

        form.setValue("resumeContent", resumeContent);

        if (isTxtFile) {
            toast({
                title: "Parsing Resume...",
                description: "Extracting your information from the .txt file.",
            });
            try {
              const parsedData = await parseResume({ resumeContent });
              form.reset({
                name: parsedData.name,
                email: parsedData.email,
                phone: parsedData.phone,
                resumeContent: resumeContent,
              });
              toast({
                title: "Resume Parsed Successfully!",
                description: "Your information has been filled in.",
              });
            } catch (error) {
              console.error("Failed to parse resume:", error);
              toast({
                title: "Error Parsing Resume",
                description: "Could not extract information. Please fill the form manually.",
                variant: "destructive",
              });
            } finally {
              setIsParsing(false);
            }
        } else {
            toast({
                title: "File Uploaded",
                description: "Your resume has been attached. Please fill out your details manually.",
            });
            setIsParsing(false);
        }
    };

    reader.onerror = () => {
        toast({
            title: "Error Reading File",
            description: "Could not read the resume file. Please try again.",
            variant: "destructive",
        });
        setIsParsing(false);
    }

    reader.readAsText(file);
    
    // Reset file input
    e.target.value = '';
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input placeholder="Your Name" {...field} className="pl-9" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                 <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} className="pl-9" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                 <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} className="pl-9" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
            </div>
             <Button variant="outline" className="w-full" asChild disabled={isParsing}>
                <label htmlFor="resume-upload" className="cursor-pointer">
                    {isParsing ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <FileUp className="mr-2 h-4 w-4" />
                    )}
                    {isParsing ? 'Processing...' : 'Upload Resume (.txt, .pdf, .docx)'}
                    <input id="resume-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".txt,.pdf,.docx" disabled={isParsing} />
                </label>
            </Button>
        </div>
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isParsing}>
          <Send className="mr-2 h-4 w-4" />
          Start Interview
        </Button>
      </form>
    </Form>
  );
}
