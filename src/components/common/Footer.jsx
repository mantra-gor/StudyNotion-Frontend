import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import {
  RiFacebookCircleFill,
  RiTwitterXFill,
  RiYoutubeFill,
  RiLinkedinFill,
} from "react-icons/ri";
import { useState } from "react";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
const Company = ["About", "Careers", "Affiliates"];
const SocialLinks = [
  {
    name: "Facebook",
    icon: <RiFacebookCircleFill />,
    link: "https://www.facebook.com",
  },
  {
    name: "Twitter",
    icon: <RiTwitterXFill />,
    link: "https://www.twitter.com",
  },
  {
    name: "YouTube",
    icon: <RiYoutubeFill />,
    link: "https://www.youtube.com",
  },
  {
    name: "LinkedIn",
    icon: <RiLinkedinFill />,
    link: "https://www.linkedin.com",
  },
];

function FooterHeading({ children, className = "" }) {
  return (
    <div className={`${className} mb-3 font-semibold text-richblack-100`}>
      {children}
    </div>
  );
}

function FooterItem({
  children,
  className = "",
  linkTo = "",
  newTab = "_self",
}) {
  return (
    <Link
      to={linkTo}
      target={newTab}
      rel={newTab === "_blank" ? "noopener noreferrer" : undefined}
      className={`${className} mb-2 text-richblack-400 text-sm font-normal pointer-events-auto cursor-pointer`}
    >
      {children}
    </Link>
  );
}

function Footer() {
  const [currentYear] = useState(new Date().getFullYear());
  return (
    <div className="bg-richblack-800 border-t border-richblack-600 mt-6 py-6">
      <div className="w-11/12 mx-auto">
        {/* Upper Footer Section */}
        <div className="py-7 flex">
          {/* Left Side Footer */}
          <div className="flex flex-wrap md:justify-between md:pr-12 gap-10 md:border-r md:w-6/12 border-richblack-700">
            <div className="flex flex-col">
              <img
                src={Logo}
                alt="StudyNotion Logo"
                className="w-[160px] mb-4"
                loading="lazy"
              />
              <div className="flex flex-col">
                <FooterHeading>Company</FooterHeading>
                {Company.map((item, index) => (
                  <FooterItem key={index}>{item}</FooterItem>
                ))}
              </div>
              <div className="flex items-end gap-5 my-4 text-richblack-400">
                {SocialLinks.map((item, index) => (
                  <Link key={index} to={item.link} className="text-xl">
                    {item.icon}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col">
                <FooterHeading>Resources</FooterHeading>
                {Resources.map((item, index) => (
                  <FooterItem key={index}>{item}</FooterItem>
                ))}
              </div>
              <div className="flex flex-col mt-4">
                <FooterHeading>Support</FooterHeading>
                <FooterItem>Help Center</FooterItem>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col">
                <FooterHeading>Plans</FooterHeading>
                {Plans.map((item, index) => (
                  <FooterItem key={index}>{item}</FooterItem>
                ))}
              </div>
              <div className="flex flex-col mt-4">
                <FooterHeading>Community</FooterHeading>
                {Community.map((item, index) => (
                  <FooterItem key={index}>{item}</FooterItem>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Footer */}
          <div className="flex flex-wrap justify-between gap-10 md:w-6/12 md:pl-12">
            {FooterLink2.map((item, index) => (
              <div key={index}>
                <FooterHeading>{item.title}</FooterHeading>
                {item.links.map((itemLink, ind) => (
                  <div key={ind} className="flex flex-col">
                    <FooterItem linkTo={itemLink.link}>
                      {itemLink.title}
                    </FooterItem>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Lower Footer Section */}
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between border-t border-richblack-700 pt-5 md:pt-7">
          <div className="flex">
            {BottomFooter.map((item, index) => (
              <FooterItem
                key={index}
                className={`px-3 ${
                  BottomFooter.length - 1 !== index ? "border-r" : ""
                } border-richblack-700`}
              >
                {item}
              </FooterItem>
            ))}
          </div>
          <div>
            <FooterItem
              newTab="_blank"
              className="hover:text-richblack-200 transition-all duration-200"
              linkTo="https://www.mantragor.tech/"
            >
              © {currentYear} Mantra Gor. All rights reserved.
            </FooterItem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
