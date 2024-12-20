import { Injectable } from "@angular/core";
import { Action, Selector, State } from "@ngxs/store";
import { LoadPopularTags } from "./tag.actions";
import { TagService } from "../../services/tag.service";

export interface TagStateModel {
  popular: string[];
}

@State<TagStateModel>({
  name: "tagState",
  defaults: {
    popular: [],
  },
})
@Injectable()
export class TagState {
  constructor(private readonly tagService: TagService) {}

  @Selector()
  static popular(state: TagStateModel): string[] {
    return state.popular;
  }

  @Action(LoadPopularTags)
  loadPopularTags({ patchState }: any) {
    this.tagService.getPopularTags().subscribe((popular) => {
      patchState({
        popular,
      });
    });
  }
}


