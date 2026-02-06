import "./subHeader.scss";
import { useEffect, useState } from "react";
import {
  genderOptions,
  statusOptions,
  type FilterParams,
} from "../../modules/characters";
import type React from "react";

interface Props {
  filters: FilterParams;
  setFilters: (f: FilterParams) => void;
}

// Todo: turn this into filters component,pass filter config to it, it should consist of primarily
// filterkey, filterType and all the other props neccessary for specific stuff lice date / select and so on
export const SubHeader = ({ filters, setFilters }: Props) => {
  // Todo: name things as descriptively as possible, what does local mean
  // Why do we set filters here as well as in the parent component can't we just reuse the filters values from the props?
  const [local, setLocal] = useState<FilterParams>({
    name: undefined,
    species: undefined,
    status: undefined,
    gender: undefined,
  });

  useEffect(() => {
    setLocal((l) => ({ ...l, ...filters }));
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (local.species !== filters.species) {
        setFilters({
          name: (local.name || "").trim(),
          species: (local.species || "").trim(),
          status: local.status || undefined,
          gender: local.gender || undefined,
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [local.species, filters, setFilters]);

  const onChange =
    (key: keyof FilterParams) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setLocal((prev) => ({ ...prev, [key]: value }));
    };

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    // filterStore.mapFilters ors msth similiar
    setFilters({
      name: (local.name || "").trim(),
      species: (local.species || "").trim(),
      status: local.status || undefined,
      gender: local.gender || undefined,
    });
  };

  return (
    // Use antd form it has all the good stuff like custom field rules, validation of form fields, helpers like set data clear data etc etc
    // for more control
    <form className="subHeader" onSubmit={submit}>
      <input
        className="filterInput"
        placeholder="NAME"
        value={local.name || ""}
        onChange={onChange("name")}
      />
      <input
        className="filterInput"
        placeholder="SPECIES"
        value={local.species || ""}
        onChange={onChange("species")}
      />
      <select
        className="filterInput"
        value={local.status || ""}
        onChange={onChange("status")}
      >
        <option value="">STATUS</option>
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <select
        className="filterInput"
        value={local.gender || ""}
        onChange={onChange("gender")}
      >
        <option value="">GENDER</option>
        {genderOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* Use ANTD button component, event better create your own Button wrapper, include stuff like custom colors etc. */}
      <button className="searchBtn" type="submit">
        SEARCH
      </button>
    </form>
  );
};
