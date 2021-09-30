import {makeAutoObservable} from 'mobx';
import {useState} from 'react';

export class PostState {
  id: string;

  constructor({id}) {
    this.id = id;
    makeAutoObservable(this);
  }
}

const usePostState = ({id}) => {
  return useState(new PostState({id}));
};

export default usePostState;
