"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Image from "next/image";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { EyeSlashIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IAuth } from "@/interface/IAuth.interface";

export default function Auth() {
  const blank: IAuth = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [isCreateAccountClicked, setCreateAccount] = useState(false);
  const [authData, setAuthData] = useState(blank);

  function populateAuthData(key: string, value: string): void {
    setAuthData({
      ...authData,
      [key]: value,
    });
  }
  
  function handleOnAuth(isRegister: boolean) {
    console.log(authData);
  }

  return (
    <main>
      <section className="container mx-auto p-5 h-lvh flex justify-center items-center flex-col lg:p-30">
        <div className="h-170 w-full rounded-xl shadow-xl flex justify-center">
          <div className="media p-5 flex justify-center items-center gap-3 flex-col lg:flex-row lg:h-full lg:gap-12">
            <Image
              className="lg:hidden"
              src="/welcoming.svg"
              alt=""
              width={150}
              height={150}
            />

            <Image
              className="hidden lg:block"
              src="/welcoming.svg"
              alt=""
              width={300}
              height={300}
            />
            <form>
              <h1 className="text-[22px] font-medium text-center lg:text-[32px]">
                {isCreateAccountClicked
                  ? "Create your account ✨"
                  : "Welcome back!👋"}
              </h1>
              <p className="text-center text-[12px] lg:text-[16px]">
                {isCreateAccountClicked
                  ? "Join us and start turning your questions into Moodle-ready quizzes with AI."
                  : "Sign in to continue creating Moodle-ready quizzes with AI."}
              </p>

              <div className="mt-5 flex justify-center">
                <Field className="max-w-sm">
                  {isCreateAccountClicked && (
                    <FieldGroup className="grid max-w-sm grid-cols-2">
                      <Field>
                        <FieldLabel
                          className="text-[12px] lg:text-[16px]"
                          htmlFor="first-name"
                        >
                          First Name
                        </FieldLabel>
                        <Input
                          className="text-[12px] lg:text-[16px]"
                          id="first-name"
                          placeholder="John"
                          value={authData.firstName}
                          onChange={(event) =>
                            populateAuthData("firstName", event.target.value)
                          }
                        />
                      </Field>
                      <Field>
                        <FieldLabel
                          className="text-[12px] lg:text-[16px]"
                          htmlFor="last-name"
                        >
                          Last Name
                        </FieldLabel>
                        <Input
                          className="text-[12px] lg:text-[16px]"
                          id="last-name"
                          placeholder="Doe"
                          value={authData.lastName}
                          onChange={(event) =>
                            populateAuthData("lastName", event.target.value)
                          }
                        />
                      </Field>
                    </FieldGroup>
                  )}
                  <FieldLabel
                    className="text-[12px] lg:text-[16px]"
                    htmlFor="inline-end-input"
                  >
                    Email
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      className="text-[12px] lg:text-[16px]"
                      id="inline-end-input"
                      type="email"
                      placeholder="Enter email"
                      value={authData.email}
                      onChange={(event) =>
                        populateAuthData("email", event.target.value)
                      }
                      required
                    />
                    <InputGroupAddon align="inline-end">
                      <EnvelopeSimpleIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldLabel
                    className="text-[12px] lg:text-[16px]"
                    htmlFor="inline-end-input"
                  >
                    Password
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      className="text-[12px] lg:text-[16px]"
                      id="inline-end-input"
                      type="password"
                      placeholder="Enter password"
                      value={authData.password}
                      onChange={(event) =>
                        populateAuthData("password", event.target.value)
                      }
                      required
                    />
                    <InputGroupAddon align="inline-end">
                      <EyeSlashIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  <Button
                    className="text-[12px] lg:text-[16px] cursor-pointer lg:p-5"
                    onClick={() => handleOnAuth(isCreateAccountClicked)}
                  >
                    Sign In
                  </Button>
                  <Separator />
                  <FieldDescription className="text-[12px] lg:text-[16px]">
                    {isCreateAccountClicked
                      ? "Already have an account?"
                      : "New here?"}{" "}
                    <a
                      className="cursor-pointer no-underline"
                      onClick={() => setCreateAccount(!isCreateAccountClicked)}
                    >
                      {isCreateAccountClicked
                        ? "Sign in"
                        : "Create an account."}
                    </a>
                  </FieldDescription>
                </Field>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
