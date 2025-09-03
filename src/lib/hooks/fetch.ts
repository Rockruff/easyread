import { useEffect, useState } from "react";

// Overload 1: StateType and FetchedDataType are the same — onData optional
export function useFetchedState<StateType, FetchParams extends any[]>(
  initialValue: StateType,
  fetcher: (...fetchParams: FetchParams) => Promise<StateType>,
  fetchParams: FetchParams,
  onData?: (data: StateType) => Promise<StateType> | StateType,
  onError?: (error: Error) => void,
): [StateType, React.Dispatch<React.SetStateAction<StateType>>];

// Overload 2: StateType and FetchedDataType differ — onData required
export function useFetchedState<StateType, FetchedDataType, FetchParams extends any[]>(
  initialValue: StateType,
  fetcher: (...fetchParams: FetchParams) => Promise<FetchedDataType>,
  fetchParams: FetchParams,
  onData: (data: FetchedDataType) => Promise<StateType> | StateType,
  onError?: (error: Error) => void,
): [StateType, React.Dispatch<React.SetStateAction<StateType>>];

// Implementation
export function useFetchedState<StateType, FetchedDataType, FetchParams extends any[]>(
  initialValue: StateType,
  fetcher: (...fetchParams: FetchParams) => Promise<FetchedDataType>,
  fetchParams: FetchParams,
  onData?: (data: FetchedDataType) => Promise<StateType> | StateType,
  onError?: (error: Error) => void,
): [StateType, React.Dispatch<React.SetStateAction<StateType>>] {
  const [state, setState] = useState<StateType>(initialValue);

  // defaults
  const finalOnData = onData ?? ((v: any) => v);
  const finalOnError = onError ?? console.log;

  useEffect(() => {
    let canceled = false;

    fetcher(...fetchParams)
      .then(finalOnData)
      .then((data) => {
        if (!canceled) setState(data);
      })
      .catch((error) => {
        if (!canceled) finalOnError(error);
      });

    return () => {
      canceled = true;
    };
  }, fetchParams);

  return [state, setState];
}

/*
Original approach:

const [documentTitle, setDocumentTitle] = useState<string>();
useEffect(() => {
  fetchDoc(id).then((doc) => setDocumentTitle(doc.title));
}, [id]);

Simplified with `useFetchedState`:

const [documentTitle, setDocumentTitle] = useFetchedState(
  "",          // initial value
  fetchDoc,    // async fetcher
  [id],        // fetch parameters
  (doc) => doc.title // transform fetched data
);

Benefits:
- Combines state + async fetching in a single hook
- Optional `onData` transformation
- Optional `onError` handling
- Automatically cancels outdated fetches when dependencies change
*/
