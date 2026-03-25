"use client";

import React, { useState } from "react";
import { Input } from "@/components/Shared/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { AppPill } from "@/app/(explorer)/_components/navigator/app-pill";
import MobileNavigatorMenu from "./mobile-navigator-menu";
import { useKeyword } from "@/app/(explorer)/_hooks/useKeyword";
import { useQuery } from "@/app/(explorer)/_hooks/useQuery";
import { Icon } from "@/components/UI/icon";
import useAppPill from "@/app/(explorer)/_components/navigator/app-pill/_hooks/useAppPill";

const patterns = [
  { label: "Apps", value: "apps" },
  { label: "Screens", value: "screens" },
  { label: "Components", value: "components" },
  { label: "Marketing", value: "marketing" },
  { label: "Flows", value: "flows" },
];

const platforms = [
  { label: "IOS", value: "ios" },
  { label: "Android", value: "android" },
  { label: "Web", value: "web" },
];

const MobileNavigatorView: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { keyword, setKeyword } = useKeyword();
  const {
    query, setPattern, setPlatform, setApps
  } = useQuery();
  const { filters, platform, pattern } = query || {};

  const {
    allApps, hiddenAppSlugs, handleToggleVisibility, handleRemoveApp
  } = useAppPill({
    query,
    setApps,
    setPlatform,
  });

  return (
    <div
      key="mobile-navigator"
      className="w-full h-fit bg-gradient-to-b from-slate-900/85 to-slate-900/60 rounded-[1.625rem] p-2.5 flex lg:hidden flex-col gap-4"
    >
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={() => setIsMenuOpen(true)}
        type="search"
        startContent={
          <Icon.Search className="text-white size-5 shrink-0" />
        }
        placeholder={filters?.length > 0 ? "Search" : "Try Search"}
        autoComplete="off"
      />
      <div className="w-full flex gap-4">
        <Select value={pattern} onValueChange={setPattern}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select pattern" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {patterns.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {platforms.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {isMenuOpen && (
        <MobileNavigatorMenu
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
        />
      )}

      {!isMenuOpen && allApps.length > 0 && (
        <div className="size-full flex gap-4">
          {allApps.map((app, index) => (
            <AppPill
              key={app.id || index}
              data={app}
              isHidden={hiddenAppSlugs.includes(app.slug)}
              onToggleVisibility={() => handleToggleVisibility(app.slug)}
              onRemove={() => handleRemoveApp(app.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavigatorView;
