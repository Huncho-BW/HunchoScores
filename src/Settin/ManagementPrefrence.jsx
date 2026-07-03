import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export default function ManagementPrefrence({ setDropDown }) {
  const [dropdwon, setdropDwon] = useState(false);
  const [dropdwonTwo, setDropDwonTwo] = useState(false);

  return (
    <div className="flex flex-col   managementSize  p-[20px]    border  bg-[#222222]   ">
      <div className="border-b px-[30px] py-[10px] border-[#e9e9e9] flex justify-between gap-[20px]">
        <div className="flex gap-[10px]">
          <h1 className="text-white">Huncho </h1>
        </div>

        <div onClick={() => setDropDown(false)}>
          <CancelIcon />
        </div>
      </div>

      <div className=" mt-[1px]  ">
        <div className="h-[269px] no-scrollbar overflow-y-auto overflow-x-hidden">
          <h1 className="text-[#AAAAAA] font-[700] mb-[10px] mt-[10px]">
            About your Personal Information
          </h1>
          <p className="text-[#AAAAAA] text-[13px]  ">
            When you visit our website, we store cookies on your browser to
            collect information. The information collected might relate to you,
            your preferences or your device, and is mostly used to make the site
            work as you expect it to and to provide a more personalized web
            experience. However, you can choose not to allow certain types of
            cookies, which may impact your experience of the site and the
            services we are able to offer. Click on the different category
            headings to find out more and change our default settings according
            to your preference. You cannot opt-out of our First Party Strictly
            Necessary Cookies as they are deployed in order to ensure the proper
            functioning of our website (such as prompting the cookie banner and
            remembering your settings, to log into your account, to redirect you
            when you log out, etc.). For more information about the First and
            Third Party Cookies used please follow this link.
          </p>

          <span className="text-[#ff6b00]  text-[13px]">Cookies</span>
          <div>
            <h1 className="text-[#AAAAAA] pb-[10px]  text-[16px]">
              Manage Consent Preferences
            </h1>
            <div
              onClick={() => setdropDwon(!dropdwon)}
              className={
                dropdwon
                  ? " border   border-[#ff6b00] bg-[#E9E9E9]"
                  : "border cursor-pointer border-white flex flex-col gap-3 h-[52px] py-[12px] px-[30px] "
              }
            >
              <div className="flex   bg-[#222222] justify-between gap-3 ">
                <div className="flex  gap-3">
                  {dropdwon ? (
                    <>
                      <RemoveIcon sx={{ color: "#ff6b00" }} />
                    </>
                  ) : (
                    <>
                      <AddIcon sx={{ color: "#ff6b00" }} />
                    </>
                  )}
                  <button className="text-[#AAAAAA]">
                    strickly Neccesary cookie
                  </button>
                </div>

                <div>
                  <h1 className="text-[#ff6b00]">always Active </h1>
                </div>
              </div>

              {dropdwon && (
                <div className="">
                  <p className="text-[#AAAAAA] p-[20px] text-[13px]">
                    These are cookies that are required for the operation of our
                    Platforms. Examples include cookies that enable you to
                    access our Platforms and cookies that ensure content works
                    correctly on your device. Without these, you will not be
                    able to use all of the services we provide. If you decide to
                    opt-out from storing these cookies, certain parts of our
                    Platforms will not work correctly and, in some cases, may
                    not work at all.
                  </p>
                </div>
              )}
            </div>

            <div onClick={() => setDropDwonTwo(!dropdwonTwo)}>
              <div
                className={
                  dropdwonTwo
                    ? " border   border-[#ff6b00] bg-[#E9E9E9]"
                    : "border cursor-pointer border-white flex flex-col gap-3 h-[52px] py-[12px] px-[30px] "
                }
              >
                <div className="flex justify-between gap-3  bg-[#222222]">
                  <div className="flex gap-3">
                    {dropdwonTwo ? (
                      <>
                        <RemoveIcon sx={{ color: "#ff6b00" }} />
                      </>
                    ) : (
                      <>
                        <AddIcon sx={{ color: "#ff6b00" }} />
                      </>
                    )}
                    <button className="text-[#AAAAAA]">
                      Sale of person Data
                    </button>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />

                      <div
                        className="w-12 h-7 bg-gray-400 rounded-full 
    peer-checked:bg-green-600 transition-colors"
                      ></div>

                      <div
                        className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full 
    transition-transform peer-checked:translate-x-5"
                      ></div>
                    </label>
                  </div>
                </div>
                {dropdwonTwo && (
                  <div>
                    <p className="text-[#AAAAAA] p-[20px] text-[13px]">
                      Under the California Consumer Privacy Act, you have the
                      right to opt-out of the sale of your personal information
                      to third parties. These cookies collect information for
                      analytics and to personalize your experience with targeted
                      ads. You may exercise your right to opt out of the sale of
                      personal information by using this toggle switch. If you
                      opt out we will not be able to offer you personalised ads
                      and will not hand over your personal information to any
                      third parties. Additionally, you may contact our legal
                      department for further clarification about your rights as
                      a California consumer by using this Exercise My Rights
                      link. If you have enabled privacy controls on your browser
                      (such as a plugin), we have to take that as a valid
                      request to opt-out. Therefore we would not be able to
                      track your activity through the web. This may affect our
                      ability to personalize ads according to your preferences.
                      Targeting cookies for marketing and advertisingThese
                      cookies record your visit to our Platforms, the links you
                      have clicked in our Platforms, and the pages you have
                      visited as linked from our Platforms (including, in the
                      case of interest-based advertising, the pages of other
                      websites). We or our partners may use this information to
                      make the advertising displayed on our Platforms and their
                      websites/applications more relevant to your interests.
                      Without these cookies, you will be able to use and enjoy
                      all of the features of our Platforms but the
                      advertisements (“ads”) you see on our Platforms or those
                      of third parties will not be tailored to your preferences
                      in a way that reflects your likely interests based on the
                      audience segments into which we have placed you.
                      Analytical or performance cookiesThese cookies (for
                      example when we use Google Analytics 360 and GumGum
                      Sports) allow us to recognise and count the number of
                      visitors to our Platforms and to see how visitors move
                      around our Platforms when they are using them. This helps
                      us to improve the way our Platforms work, for example, by
                      ensuring that users are finding what they are looking for
                      easily.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e9e9e9] w-[100%] flex justify-end">
          <div className="flex mt-[15px] mb-[15px] mr-[20px] min-h-[40px] bg-[#ff6b00] border border-[#ff6b00]  h-[40px] ">
            <button
              onClick={() => setDropDown(false)}
              className="pl-[30px] pr-[30px] whitespace-nowrap font-[] rounded-xs"
            >
              comfire my cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
