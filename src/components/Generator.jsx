import React, { useState } from "react";
import Button from "./Button";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utilities/swoldier";
function Header(props) {
  const { index, tittle, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-4">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{tittle}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto ">{description}</p>
    </div>
  );
}
const Generator = (props) => {
  const{setGoal,goal,setMuscles,muscles,setPoison,poison,updateWorkout}=props
  const [showModel, setShowModel] = useState(false);
  
  function toggleModel() {
    setShowModel(!showModel);
  }

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter(val => val !== muscleGroup));
      return;
    }

    if (muscles.length > 2) {
      return;
    }
    if (poison !== 'individual') {
      setMuscles([muscleGroup]);
      setShowModel(false)
      return;
    }

    setMuscles([...muscles, muscleGroup]);
    if(muscles.length===2){
      setShowModel(false)
    }
  }
  return (
    <SectionWrapper
    id={"generate"}
      header={"generate your workout"}
      tittle={["It's", "Huge", "o'Clock"]}
    >
      <Header
        index={"01"}
        tittle={"Pick your Poison"}
        description={"Select The Workout You Wish To Enjoy."}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              onClick={() => {
                setMuscles([])
                setPoison(type);
              }}
              className={
                "bg-slate-950 border-2 px-4 duration-200 py-3 rounded-lg " +
                (type === poison ? "border-blue-400" : "border-blue-600")
              }
              key={typeIndex}
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      <Header
        index={"02"}
        tittle={"Lock on targets"}
        description={"Select the muscles judged for annhilation. "}
      />
      <div className="bg-slate-950 border-2 border-solid border-blue-400 rounded-lg flex flex-col">
        <button
          onClick={toggleModel}
          className="relative p-4 flex items-center justify-center"
        >
          <p className="capitalize">{muscles.length==0?'Select muscle groups':muscles.join(' ')}</p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
        </button>
        {showModel && (
          <div className="flex flex-col p-3">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup, muscleGroupIndex) => {
              return (
                <button
                  onClick={() => {
                    updateMuscles(muscleGroup); 
                  }}
                  key={muscleGroupIndex}
                  className={
                    'hover:text-blue-400 duration-200 ' +
                    (muscles.includes(muscleGroup) ? ' text-red-400 ' : ' ')
                  }>
                  <p className="uppercase">{muscleGroup}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Header
        index={"03"}
        tittle={"Become Juggernaut"}
        description={"Select your Ultimate Objective."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button
              onClick={() => {
                setGoal(scheme);
              }}
              className={
                "bg-slate-950 border-2 px-4 duration-200 py-3 rounded-lg " +
                (scheme === goal ? "border-blue-400" : "border-blue-600")
              }
              key={schemeIndex}
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div> 
      <Button func={updateWorkout} text={'Formulate'} />
    </SectionWrapper>
    
  );
};

export default Generator;
