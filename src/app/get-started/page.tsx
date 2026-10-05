"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function GetStarted() {
  const isAuthenticated = false;
  return (
    <main>
      <section className="container mx-auto p-5 h-lvh flex justify-center items-center flex-col lg:p-30">
        <Image
          className="mb-5"
          src="/question-answered.svg"
          alt="hero-image"
          width={200}
          height={200}
        />
        <h1 className="text-center font-bold text-2xl mb-3 lg:text-3xl">
          Turn your questions into Moodle XML ✨
        </h1>
        <p className="text-center text-[14px] mb-3 lg:text-[18px]">
          Creating Moodle quizzes doesn’t have to be tedious. Simply paste your
          questions and answer key, and let AI handle the formatting for you. No
          manual XML. No complicated setup. Just paste, generate, and download.
        </p>

        <span>
          <Link href={!isAuthenticated ? "/auth" : "/home"}>
            <Button
              className="p-5 cursor-pointer text-[14px] lg:text-[18px] lg:p-6"
              size="sm"
            >
              Start Creating
              <ArrowRightIcon />
            </Button>
          </Link>
        </span>
      </section>
    </main>
  );
}
