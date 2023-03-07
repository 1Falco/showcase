import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface SportingEvent {}
interface DanceEvent {
  automaticDeletion: boolean;
}
interface ConcertEvent {}
/**
 * The base Component class declares common operations for both simple and
 * complex objects of a composition.
 */
abstract class BaseSelectionModel<T> extends SelectionModel<T> {
  protected static typeOfInstance<K extends Keys>(
    k: SingleKeys<K>,
    _multiple?: boolean,
    initiallySelectedValues?: SportingEvent[] & DanceEvent[] & ConcertEvent[],
    _emitChanges?: boolean
  ): ClassType<K> {
    return new SelectorsMap[k](
      _multiple,
      initiallySelectedValues,
      _emitChanges
    );
  }
  /**
   * The base Component may implement some default behavior or leave it to
   * concrete classes (by declaring the method containing the behavior as
   * "abstract").
   */
  public abstract get selectedElements$(): Observable<T[]>;
  // protected typeof<T extends Keys>(k: SingleKeys<T>): ClassType<T> { return; };
}

export class ShowcaseSelectionModel<T> extends BaseSelectionModel<T> {
  public static readonly instantiate = ShowcaseSelectionModel.typeOfInstance;

  get selectedElements$(): Observable<T[]> {
    return this.changed.pipe(
      // startWith({ source: { selected: [] } }),
      map((selectionItem: SelectionChange<T>) => selectionItem.source.selected)
    );
  }
}

class SportingEventsSelector extends ShowcaseSelectionModel<SportingEvent> {
  public readonly _sportingEventHook = this.mockSportingEventHook;

  protected mockSportingEventHook(): Observable<boolean> {
    return of(false);
  }
}

class DancingEventsSelector extends ShowcaseSelectionModel<DanceEvent> {
  public readonly canLockElement$ = this.lockingHook;
  public readonly hideLockOptions$ = this.hideLockOptions;
  public get canLock() {
    return this.lockingAllowed();
  }
  /**
   * Note that the Creator may also provide some default implementation of the
   * factory method.
   */
  protected lockingHook(): Observable<boolean> {
    return this.selectedElements$.pipe(
      map((cases: DanceEvent[]) =>
        cases.every((c: DanceEvent) => !c.automaticDeletion)
      )
    );
  }

  protected hideLockOptions(): Observable<boolean> {
    return this.selectedElements$.pipe(
      map(
        (cases: DanceEvent[]) =>
          cases.some((c: DanceEvent) => c.automaticDeletion) &&
          cases.some((c: DanceEvent) => !c.automaticDeletion)
      )
    );
  }

  private lockingAllowed() {
    return (
      !!this.selected.length &&
      this.selected.every((_case: DanceEvent) => !_case.automaticDeletion)
    );
  }
}
class ConcertEventsSelector extends ShowcaseSelectionModel<ConcertEvent> {
  protected mergingHook() {
    return;
  }
}

const SelectorsMap = {
  SportingEvent: SportingEventsSelector,
  DanceEvent: DancingEventsSelector,
  ConcertEvent: ConcertEventsSelector,
};

type Selectors = typeof SelectorsMap;
type Keys = keyof Selectors; // 'dev' | 'manager'
type Tuples<T> = T extends Keys ? [T, InstanceType<Selectors[T]>] : never;
type SingleKeys<K> = [K] extends (K extends Keys ? [K] : never) ? K : never;
type ClassType<A extends Keys> = Extract<Tuples<Keys>, [A, any]>[1];
