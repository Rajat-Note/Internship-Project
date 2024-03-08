import { useCheckInfoStore } from "@/hooks/use-check-info-store";
import { InfoType } from "@/types";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

export const NetlifyWelcomeEmail = ({ checked }: any) => {
  return (
    <Html>
      <Head />
      <Preview>Netlify Welcome</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#2250f4",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans">
          <Container className="bg-white p-45">
            <Heading className="text-center my-0 leading-8">
              Welcome to Info Manager App
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Congratulations! You're joining over 3 million developers
                  around the world who use Netlify to build and ship sites,
                  stores, and apps.
                </Text>
                {checked?.map((item: any) => (
                  <Text>
                    Name: {item.name}
                    Email: {item.email}
                    Phone: {item.phone}
                    Hobbies: {item.hobbies.join(" ")}
                  </Text>
                ))}
              </Row>
            </Section>
          </Container>

          <Container className="mt-20">
            <Section>
              <Row>
                <Column className="text-right px-20">
                  <Link>Unsubscribe</Link>
                </Column>
                <Column className="text-left">
                  <Link>Manage Preferences</Link>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NetlifyWelcomeEmail;
