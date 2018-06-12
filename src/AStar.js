/**
 * Реализует алгоритм поиска решения А*.
 */
export default class AStar {

    /**
     * Создает объект для поиска терминального состояния по указанным правилам.
     *
     * @param rules правила, в соответствии с которыми будет производиться поиск
     *              терминального состояния.
     */
    constructor(rules) {
        this._rules = rules;

        this._closedStates = 0;
    }

    /**
     * Применяет алгоритм А* для поиска крадчайшего пути до терминального
     * состоянияот указанного.
     *
     * @param startState - начальное состояние.
     * @return последовательность состояний от заданного до терминального.
     */
    search(startState) {
        let close = [];
        let open = []
        open.push(startState);
        startState.setG(0);
        startState.setH(this._rules.getH(startState));

        while (open.length != 0) {
            let x = this._getStateWithMinF(open);
            if (rules.isTerminate(x)) {
                this._closedStates = close.length;
                return this._completeSolution(x);
            }

            // NOTE: мб тут баг
            open = open.filter((e) => e != x);

            // NOTE: мб тут баг
            close.push(x);

            let neighbors = this._rules.getNeighbors(x);
            for (let neighbor of neighbors) {
                if (close.includes(neighbor)) {
                    continue;
                }
                let g = x.getG() + this._rules.getDistance(x, neighbor);
                let isGBetter = false;
                if (!open.includes(neighbor)) {
                    neighbor.setH(this._rules.getH(neighbor));
                    open.push(neighbor);
                    isGBetter = true;
                } else {
                    isGBetter = g < neighbor.getG();
                }
                if (isGBetter) {
                    neighbor.setParent(x);
                    neighbor.setG(g);
                }
            }
        }
        return null;
    }

    getClosedStatesCount() {
        return this._closedStates;
    }

    /**
     * Находит вершину в списке open с наименьшим значением веса.
     *
     * @param open список открытых вершин.
     * @return вершину с наименьшим весом.
     */
    _getStateWithMinF(open) {
        let res = null;
        let min = Number.MAX_VALUE;
        for (let state of open) {
            if (state.getF() < min) {
                min = state.getF();
                res = state;
            }
        }
        return res;
    }

    /**
     * Составляет последовательность состояний пройденных от начального
     * состояния до конечного.
     *
     * @param terminate найденное конечное состояние.
     * @return последовательность состояний пройденных от начального
     * состояния до конечного.
     */
    _completeSolution(terminate) {
        let path = [];
        let c = terminate;
        while (c != null) {
            path = [c, ...path];
            c = c.getParent();
        }
        return path;
    }
}
